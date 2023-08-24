import { GetBicCode } from '../datasets';
import { FullCountriesResult } from '../datasets-extended';
/**
 * Validates an IBAN and returns the formatted version.
 *
 * @param iban - The IBAN to validate.
 * @returns The formatted IBAN Or undefined if the IBAN is invalid.
 *
 */
export declare function ibanIsValid(iban: string): string | undefined;
/**
 * Retrieves the BIC code for a given IBAN.
 *
 * @param ibanArg - The IBAN for which to retrieve the BIC code.
 * @returns The BIC code associated with the IBAN.
 *
 *
 *
 */
export declare function ibanToBic(ibanArg: string): GetBicCode | undefined;
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
export declare function ibanToBankName(ibanArg: string): FullCountriesResult | undefined;
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
export declare function bicToBankName(bicArgs: string): FullCountriesResult | undefined;
