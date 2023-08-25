export interface ATAddress {
  type: string;
  streetAndNumber: string;
  postalCode: string;
  city: string;
  poBoxNumber?: string;
}

interface Contacts {
  phone: string | null;
  fax?: string | null;
  email?: string | null;
  url?: string | null;
}

export interface ATBankInfo {
  code?: string | number | null;
  bic?: string | null;
  name?: string;
  addresses?: ATAddress[];
  contacts?: Contacts;
}

export interface AustrianBanks {
  [bankCode: string]: ATBankInfo;
}

// be
interface BankNameTranslations {
  nl?: string;
  fr?: string;
  de?: string;
}

export interface BEBankInfo {
  code: string;
  bic?: string;
  name: string | BankNameTranslations;
}

export interface BelgiumBanks {
  [bankCode: string]: BEBankInfo;
}

// de
interface Branch {
  name?: string;
  shortName?: string;
  bic?: string;
}

export interface DEBankInfo {
  code: string;
  name?: string;
  shortName?: string;
  bic?: string;
  branches?: Branch[];
}

export interface GermanBanks {
  [bankCode: string]: DEBankInfo;
}

// es
export interface ESAddress {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface ESBankInfo {
  bic: string;
  name: string;
  address: ESAddress;
}

export interface SpainBanks {
  [bankCode: string]: ESBankInfo;
}

// fr
export interface FRAddress {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface FRBankInfo {
  bic: string;
  name: string;
  address: FRAddress;
}

export interface FranceBanks {
  [bankCode: string]: FRBankInfo;
}

// lu
export interface LUBankInfo {
  name: string;
  code: string | number;
  bic: string;
}

export interface LuxembourgBanks {
  [bankCode: string]: LUBankInfo;
}

// nl
export interface NLBankInfo {
  name: string;
  code: string;
  bic: string | null;
}

export interface NetherlandsBanks {
  [bankCode: string]: NLBankInfo;
}

// ch
export interface CHAddress {
  street?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

export interface CHBankInfo {
  code: string;
  bic: string;
  name: string;
  address: CHAddress | CHAddress[];
}

export interface SwitzerlandBanks {
  [bankCode: string]: CHBankInfo;
}

// cz
export interface CZBankInfo {
  code: string;
  bic: string;
  name: string;
}

export interface CzechBanks {
  [bankCode: string]: CZBankInfo;
}
