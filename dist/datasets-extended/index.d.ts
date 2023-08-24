import { AustrianBanks, BelgiumBanks, FranceBanks, GermanBanks, LuxembourgBanks, NetherlandsBanks, SpainBanks } from '../types/dataset-extended/types';
export type FullCountriesResult = AustrianBanks | BelgiumBanks | GermanBanks | SpainBanks | FranceBanks | LuxembourgBanks | NetherlandsBanks;
export declare const datasetsExtended: Record<string, FullCountriesResult>;
