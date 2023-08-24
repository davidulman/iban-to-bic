import { electronicFormatIBAN, isValidIBAN } from 'ibantools';
import { GetBicCode, datasets } from './datasets';
import { FullCountriesResult, datasetsExtended } from './datasets-extended';

export function ibanIsValid(iban: string): string {
  const formattedIBAN = electronicFormatIBAN(iban);
  const isValid = isValidIBAN(formattedIBAN as string);
  if (!isValid) throw new Error('Invalid IBAN');
  return formattedIBAN as string;
}

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
