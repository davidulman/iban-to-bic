import * as _ from 'lodash';
import { electronicFormatIBAN, isValidIBAN } from 'ibantools';
import { GetBicCode, datasets } from '../datasets';
import { FullCountriesResult, datasetsExtended } from '../datasets-extended';
import { DEBankInfo, GermanBanks } from '../types/dataset-extended/types';

/**
 * Validates an IBAN and returns the formatted version.
 *
 * @param iban - The IBAN to validate.
 * @returns The formatted IBAN Or undefined if the IBAN is invalid.
 *
 */
export function ibanIsValid(iban: string): string | undefined {
  const formattedIBAN = electronicFormatIBAN(iban);
  const isValid = isValidIBAN(formattedIBAN as string);
  if (!isValid) return;
  // if (!isValid) throw new Error('Invalid IBAN');
  return formattedIBAN as string;
}

/**
 * Retrieves the BIC code for a given IBAN.
 *
 * @param ibanArg - The IBAN for which to retrieve the BIC code.
 * @returns The BIC code associated with the IBAN.
 *
 *
 *
 */
export function ibanToBic(ibanArg: string): GetBicCode | undefined {
  const formattedIBAN = ibanIsValid(ibanArg);
  if (!formattedIBAN) return;
  const country = formattedIBAN.slice(0, 2);
  if (!datasets[country]) return;

  let bankCode;
  if (country === 'AT') bankCode = formattedIBAN.substr(4, 5);
  else if (country === 'BE') bankCode = formattedIBAN.substr(4, 3);
  else if (country === 'DE') bankCode = formattedIBAN.substr(4, 8);
  else if (country === 'ES') bankCode = formattedIBAN.substr(4, 4);
  else if (country === 'FR') bankCode = formattedIBAN.substr(4, 5);
  else if (country === 'LU') bankCode = formattedIBAN.substr(4, 3);
  else if (country === 'NL') bankCode = formattedIBAN.substr(4, 4);
  else if (country === 'CH') bankCode = formattedIBAN.substr(5, 4);
  else if (country === 'CZ') bankCode = formattedIBAN.substr(4, 4);
  if (!bankCode) return;

  return { [bankCode]: datasets[country][bankCode] };
}

/**
 * Retrieves bank information for a given IBAN.
 *
 * @param ibanArg - The IBAN for which to retrieve bank information.
 * @returns Bank information associated with the IBAN.
 * 
 * 
 * NOTE: With German Bank Names, Many Banks has multiple branches names, so now by default if there is not a name or short name for the bank, it will return the FIRST branch name and short name.
 *
 ```javascript
//  {
//   "code": "68492200",
//   "bic": "GENODE61WT1",
//   "branches": [
//     { "name": "Volksbank Hochrhein", "shortName": "Volksbank Hochrhein" }, // INDEX 0
//     { 
//       "name": "Volksbank Hochrhein (Gf P2)",
//       "shortName": "VB Hochrhein Waldshut-Tieng"
//     } // INDEX 1
//   ],
//   // name and shortName are from index 0 of branches array
//   "name": 'Volksbank Hochrhein',
//   "shortName": 'Volksbank Hochrhein'
// }
```
 * NOTE: With Belgium Bank Names, The Banks has multiple names for different languages, So you should be aware that it return an Object with the names for each language.
 * 
  ```javascript
//   {
//       "code": "096",
//       "bic": "GKCCBEBB",
//       "name": {
//           "nl": "BELFIUS BANK",
//           "fr": "BELFIUS BANQUE"
//       }
// }
  ```
 */
export function ibanToBankName(ibanArg: string): FullCountriesResult | undefined {
  const formattedIBAN = ibanIsValid(ibanArg);
  if (!formattedIBAN) return;

  const country = formattedIBAN.slice(0, 2);
  if (!datasetsExtended[country]) return;

  let bankCode;
  if (country === 'AT') bankCode = formattedIBAN.substr(4, 5);
  else if (country === 'BE') bankCode = formattedIBAN.substr(4, 3);
  else if (country === 'DE') {
    bankCode = formattedIBAN.substr(4, 8);
    const res = datasetsExtended[country][bankCode] as DEBankInfo;

    if (!res.name || !res.shortName) {
      const branch = res.branches?.find(b => b.name && b.shortName);
      if (branch) {
        res.name = branch.name;
        res.shortName = branch.shortName;
      }
    }
    return res as DEBankInfo & GermanBanks;
  } else if (country === 'ES') bankCode = formattedIBAN.substr(4, 4);
  else if (country === 'FR') bankCode = formattedIBAN.substr(4, 5);
  else if (country === 'LU') bankCode = formattedIBAN.substr(4, 3);
  else if (country === 'NL') bankCode = formattedIBAN.substr(4, 4);
  else if (country === 'CH') bankCode = formattedIBAN.substr(5, 4);
  else if (country === 'CZ') bankCode = formattedIBAN.substr(4, 4);

  if (!bankCode) return;

  return datasetsExtended[country][bankCode] as FullCountriesResult;
}

/**
 * Retrieves bank information for a given BIC.
 *
 * @param bicArg - The BIC for which to retrieve bank information.
 * @returns Bank information associated with the BIC.
 * 
 * 
 * NOTE: I've Seen that some Banks doesn't has BIC field, so if it return undefined, you can use the ibanToBankName function since it search for the bank code.
 * 
```javascript
//  {
//   "code": "68492200",
//   "bic": "GENODE61WT1",
//   "branches": [
//     { "name": "Volksbank Hochrhein", "shortName": "Volksbank Hochrhein" }, // INDEX 0
//     { 
//       "name": "Volksbank Hochrhein (Gf P2)",
//       "shortName": "VB Hochrhein Waldshut-Tieng"
//     } // INDEX 1
//   ],
//   // name and shortName are from index 0 of branches array
//   "name": 'Volksbank Hochrhein',
//   "shortName": 'Volksbank Hochrhein'
// }
```

 * 
 * ```javascript
//   {
//       "code": "096",
//       "bic": "GKCCBEBB",
//       "name": {
//           "nl": "BELFIUS BANK",
//           "fr": "BELFIUS BANQUE"
//       }
// }
  ```
 */

export function bicToBankName(bicArgs: string): FullCountriesResult | undefined {
  const bic = bicArgs.toUpperCase();

  if (!bicArgs || bicArgs.length < 8) return;

  const country = bic.substring(4, 6).toUpperCase();
  if (!datasetsExtended[country]) return;

  const findBank = Object.values(datasetsExtended[country]).find(
    bank => (bank.bic && bank.bic.includes(bic)) || bic.startsWith(bank.bic),
  );

  if (country === 'DE') {
    const res = findBank as DEBankInfo;

    if (!res.name || !res.shortName) {
      const branch = res.branches?.find(b => b.name && b.shortName);
      if (branch) {
        res.name = branch.name;
        res.shortName = branch.shortName;
      }
    }
    return res as DEBankInfo & GermanBanks;
  }

  return findBank as FullCountriesResult;
}
