const { writeOutputs, downloadCSV } = require('./utils');

module.exports = async () => {
  let banks = await downloadCSV(
    'https://www.cnb.cz/cs/platebni-styk/.galleries/ucty_kody_bank/download/kody_bank_CR.csv',
    { separator: ';' },
  );

  const bankCodesObj = {};

  banks.forEach(b => {
    if (!bankCodesObj[b['Kód platebního styku']]) {
      bankCodesObj[b['Kód platebního styku']] = {
        code: b['Kód platebního styku'],
        name: b['Poskytovatel platebních služeb'],
        bic: b['BIC kód (SWIFT)'],
      };
    }
  });

  await writeOutputs('cz', bankCodesObj);
};
