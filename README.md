# banking-tools

[![GitHub license](https://img.shields.io/github/license/YourUsername/banking-tools)](https://github.com/YourUsername/banking-tools/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/banking-tools)](https://www.npmjs.com/package/banking-tools) [![Unit tests workflow status](https://github.com/YourUsername/banking-tools/actions/workflows/tests.yaml/badge.svg)](https://github.com/YourUsername/banking-tools/actions/workflows/tests.yaml)

A lightweight library to determine the SWIFT BIC of an IBAN. Supports IBANs from Austria, Belgium, Germany, Luxembourg, Netherlands, Spain, and France.

## Usage

## Retrieve BIC from IBAN

```javascript
const { ibanToBic } = require('banking-tools');

const bic = ibanToBic('DE51500105179975341634');
// Returns BIC: "INGDDEFFXXX"
```

The ibanToBic function returns undefined if the IBAN is invalid (validated internally using ibantools) or if no corresponding BIC was found.

## Check if IBAN is valid

```javascript
import { isValidIBAN } from 'banking-tools';

const isValid = isValidIBAN('DE51500105179975341634');
// Returns true
```

Note: This function using ibantools to validate the IBAN, so it will return false if the IBAN is not valid.

## Retrieve Bank Name from IBAN

```javascript
import { ibanToBankName } from 'banking-tools';

const bankInfo = ibanToBankName('DE51500105179975341634');
// Returns :

 // NOTE: With German Bank Names, Many Banks has multiple branches names, so now by default if there is not a name or short name for the bank, it will return the FIRST branch name and short name.

 {
  "code": '68492200',
  "bic": 'GENODE61WT1',
  "branches": [
    { "name": 'Volksbank Hochrhein', "shortName": 'Volksbank Hochrhein' }, // INDEX 0
    {
      "name": 'Volksbank Hochrhein (Gf P2)',
      "shortName": 'VB Hochrhein Waldshut-Tieng'
    } // INDEX 1
  ],
  // name and shortName are from index 0 of branches array
  "name": 'Volksbank Hochrhein',
  "shortName": 'Volksbank Hochrhein'
}
 // NOTE: With Belgium Bank Names, The Banks has multiple names for different languages, So you should be aware that it return an Object with the names for each language.
  {
      "code": "096",
      "bic": "GKCCBEBB",
      "name": {
          "nl": "BELFIUS BANK",
          "fr": "BELFIUS BANQUE"
      }
}
```

## Retrieve Bank Name from BIC

```javascript
    import { bicToBankName } from 'banking-tools';

    const bankInfo = bicToBankName('GENODE61WT1');
    // Returns :
    {
        "code": "68492200",
        "bic": "GENODE61WT1",
        "branches": [
            {
                "name": "Volksbank Hochrhein",
                "shortName": "Volksbank Hochrhein"
            },
            {
                "name": "Volksbank Hochrhein (Gf P2)",
                "shortName": "VB Hochrhein Waldshut-Tieng"
            }
        ],
        "name": "Volksbank Hochrhein",
        "shortName": "Volksbank Hochrhein"
    }
```

## TypeScript Support

Both ibanToBic and ibanToBankName functions come with TypeScript support and provide clear typings for the return values.

## Updating the dataset

The following will fetch the newest data from the respective national bank authorities (e.g. Bundesbank in Germany or OeNB in Austria) and regenerate the files in the `datasets` and the `datasets-extended` directory:

```
npm run generate
```

For Spain and France, data directly from the European Central Bank is used, see [here](https://www.ecb.europa.eu/stats/financial_corporations/list_of_financial_institutions/html/monthly_list-MID.en.html).

## License

MIT
