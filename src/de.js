const assert = require('assert');
const path = require('path');
const fs = require('fs-extra');
const xlsx = require('xlsx');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

// maps column index starting at 0 to A,...,Z,AA,AB,...,ZY,ZZ
function columnCode(col) {
  assert(col >= 0 && col < 26 + 26 * 26);
  const letter = n => String.fromCharCode(n + 'A'.charCodeAt(0));
  if (col < 26) return letter(col);
  return letter(Math.floor(col / 26) - 1) + letter(col % 26);
}

function rowToObject(worksheet, row) {
  const col = n => {
    const v = worksheet[`${columnCode(n)}${row}`];
    return v ? v.v : v;
  };
  return {
    code: col(0), // Bankleitzahl
    hasOwnCode: col(1) === 1, // bankleitzahlführender Zahlungsdienstleister or not
    name: col(2), // Bezeichnung
    shortName: col(5), // Kurzbezeichnung
    bic: col(7), // BIC (Business Identifier Code)
    status: col(10), // A = added, M = modified, D = deleted
  };
}

async function getWorksheet() {
  const document = new JSDOM(
    await (
      await fetch(
        'https://www.bundesbank.de/de/aufgaben/unbarer-zahlungsverkehr/serviceangebot/bankleitzahlen/download-bankleitzahlen-602592',
      )
    ).text(),
  ).window.document;

  let box;
  const headlines = document.getElementsByClassName('linklist__headline mt-4');
  for (let i = 0; i < headlines.length; i++) {
    if (headlines[i].innerHTML === 'Bankleitzahlendateien ungepackt') {
      box = headlines[i].parentElement;
      break;
    }
  }

  const url = 'https://www.bundesbank.de' + box.getElementsByTagName('a')[1].getAttribute('href');
  return xlsx.read(await (await fetch(url)).buffer(), { type: 'buffer' }).Sheets.Daten;
}

module.exports = async () => {
  const worksheet = await getWorksheet();

  const bankCodesObj = {};
  for (let i = 2; worksheet['A' + i] !== undefined; i++) {
    const row = rowToObject(worksheet, i);
    if (row.status === 'D') continue; // ignore deleted entries
    const c = row.code;
    delete row.code;
    delete row.status;

    if (bankCodesObj[c] === undefined) bankCodesObj[c] = { code: c, branches: [] };
    bankCodesObj[c].branches.push(row);
  }

  const bankCodes = Object.values(bankCodesObj);
  bankCodes.forEach(c => {
    // for one bank code (Bankleitzahl), there can be several BICs, but only one
    // "bankleitzahlführender Zahlungsdienstleister", which does not have to have a BIC
    assert(c.branches.filter(b => b.hasOwnCode).length === 1);

    // make sure that the branch where "hasOwnCode" is true is at the beginning, then that property can be removed
    c.branches = [c.branches.find(b => b.hasOwnCode), ...c.branches.filter(b => !b.hasOwnCode)];
    c.branches.forEach(b => delete b.hasOwnCode);

    // if all branches have the same name and short name, put them into the parent entry
    if (new Set(c.branches.map(b => JSON.stringify([b.name, b.shortName]))).size === 1) {
      c.name = c.branches[0].name;
      c.shortName = c.branches[0].shortName;
      c.branches.forEach(b => {
        delete b.name;
        delete b.shortName;
      });
    }

    // if all branches have the same BIC, put it into the parent entry as well
    const bics = [...new Set(c.branches.map(b => b.bic).filter(x => x !== undefined))];
    if (bics.length === 1) {
      c.bic = bics[0];
      c.branches.forEach(b => delete b.bic);
    }

    // move the branches property to the end of the object
    const b = c.branches;
    delete c.branches;
    c.branches = b;

    // remove all branches that have no properties anymore
    c.branches = c.branches.filter(b => Object.keys(b).length !== 0);
    if (c.branches.length === 0) delete c.branches;

    bankCodesObj[c.code] = c;
  });

  await fs.writeJSON(path.join(__dirname, '../datasets-extended/de.json'), bankCodesObj);

  const bankCodesToBic = Object.entries(bankCodesObj).reduce((prev, [code, { bic, branches }]) => {
    if (bic) prev[code] = bic;
    else if (branches && branches[0].bic) prev[code] = branches[0].bic;
    return prev;
  }, {});

  await fs.writeJSON(path.join(__dirname, '../datasets/de.json'), bankCodesToBic);
};