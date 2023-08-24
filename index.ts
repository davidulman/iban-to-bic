import { electronicFormatIBAN, isValidIBAN } from 'ibantools';
import { GetBicCode, datasets } from './datasets';
import { FullCountriesResult, datasetsExtended } from './datasets-extended';

/**
 * Validates an IBAN and returns the formatted version.
 *
 * @param iban - The IBAN to validate.
 * @returns The formatted IBAN.
 * @throws Error if the input IBAN is invalid.
 */
export function ibanIsValid(iban: string): string {
  const formattedIBAN = electronicFormatIBAN(iban);
  const isValid = isValidIBAN(formattedIBAN as string);
  if (!isValid) throw new Error('Invalid IBAN');
  return formattedIBAN as string;
}

/**
 * Retrieves the BIC code for a given IBAN.
 *
 * @param ibanArg - The IBAN for which to retrieve the BIC code.
 * @returns The BIC code associated with the IBAN.
 */
export function ibanToBic(ibanArg: string): GetBicCode | undefined {
  const formattedIBAN = ibanIsValid(ibanArg);

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
  if (!bankCode) return;

  return { [bankCode]: datasets[country][bankCode] };
}

/**
 * Retrieves bank information for a given IBAN.
 *
 * @param ibanArg - The IBAN for which to retrieve bank information.
 * @returns Bank information associated with the IBAN.
 */
export function ibanToBankName(ibanArg: string): FullCountriesResult | undefined {
  const formattedIBAN = ibanIsValid(ibanArg);

  const country = formattedIBAN.slice(0, 2);
  if (!datasetsExtended[country]) return;

  let bankCode;
  if (country === 'AT') bankCode = formattedIBAN.substr(4, 5);
  else if (country === 'BE') bankCode = formattedIBAN.substr(4, 3);
  else if (country === 'DE') bankCode = formattedIBAN.substr(4, 8);
  else if (country === 'ES') bankCode = formattedIBAN.substr(4, 4);
  else if (country === 'FR') bankCode = formattedIBAN.substr(4, 5);
  else if (country === 'LU') bankCode = formattedIBAN.substr(4, 3);
  else if (country === 'NL') bankCode = formattedIBAN.substr(4, 4);
  if (!bankCode) return;

  return datasetsExtended[country][bankCode] as FullCountriesResult;
}
