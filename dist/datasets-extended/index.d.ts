import { AustrianBanks, BelgiumBanks, CzechBanks, FranceBanks, GermanBanks, LuxembourgBanks, NetherlandsBanks, SpainBanks, SwitzerlandBanks } from '../types/dataset-extended/types';
export type FullCountriesResult = AustrianBanks | BelgiumBanks | GermanBanks | SpainBanks | FranceBanks | LuxembourgBanks | NetherlandsBanks | SwitzerlandBanks | CzechBanks;
export declare const datasetsExtended: Record<string, FullCountriesResult>;
