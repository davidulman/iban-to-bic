const assert = require('assert');
const { getCellValue, writeOutputs, downloadXLSX, assertTableHead } = require('./utils');

function rowToObject(worksheet, row) {
  const col = n => getCellValue(worksheet, n, row);
  return {
    code: col(4),
    bic: col(22),
    name: col(12),
    shortName: col(11),
    postalAddress: col(14),
    zipCode: col(15),
    place: col(16),
    phone: col(17),
    fax: col(18),
    dialingCode: col(19),
    countryCode: col(20),
  };
}

module.exports = async () => {
  const worksheet = await downloadXLSX(
    'https://api.six-group.com/api/epcd/bankmaster/v2/public/downloads/bcbankenstamm_e.xls',
    'Bank Master Data',
  );

  assertTableHead(worksheet, 1, [
    'Group',
    'IID',
    'Branch ID',
    'New IID ',
    'SIC-IID',
    'Head Office',
    'IID Type',
    'Valid since',
    'SIC',
    'euroSIC',
    'Language ',
    'Short Name',
    'Bank/Institution Name',
    'Domicile Address ',
    'Postal Address',
    'Zip Code',
    'Place',
    'Phone ',
    'Fax',
    'Dialing Code',
    'Country Code',
    'Postal Account',
    'BIC',
  ]);

  const bankCodesObj = {};

  for (let i = 3; worksheet['A' + i] !== undefined; i++) {
    const row = rowToObject(worksheet, i);
    if (bankCodesObj[row.code] !== undefined) {
      continue;
    } else {
      bankCodesObj[row.code] = row;
    }
  }

  await writeOutputs('ch', bankCodesObj);
};
