# banking-tools

[![GitHub license](https://img.shields.io/github/license/YourUsername/banking-tools)](https://github.com/YourUsername/banking-tools/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/banking-tools)](https://www.npmjs.com/package/banking-tools) [![Unit tests workflow status](https://github.com/YourUsername/banking-tools/actions/workflows/tests.yaml/badge.svg)](https://github.com/YourUsername/banking-tools/actions/workflows/tests.yaml)

A lightweight library to determine the SWIFT BIC of an IBAN. Supports IBANs from Austria, Belgium, Germany, Luxembourg, Netherlands, Spain, and France.

## Usage

```javascript
const { ibanToBic } = require('banking-tools');

const bic = ibanToBic('DE51500105179975341634');
// bic is now "INGDDEFFXXX"
```

The ibanToBic function returns undefined if the IBAN is invalid (validated internally using ibantools) or if no corresponding BIC was found.

## Retrieve Bank Name from IBAN

```javascript
Copy code
import { ibanToBankName } from 'banking-tools';

const bankInfo = ibanToBankName('DE51500105179975341634');
// bankInfo is an object containing bank details, undefined if not found

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
