import {
  AustrianBanks,
  BelgiumBanks,
  FranceBanks,
  GermanBanks,
  LuxembourgBanks,
  NetherlandsBanks,
  SpainBanks,
} from '../types/dataset-extended/types';
import at from './at.json';
import be from './be.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import lu from './lu.json';
import nl from './nl.json';

export type FullCountriesResult =
  | AustrianBanks
  | BelgiumBanks
  | GermanBanks
  | SpainBanks
  | FranceBanks
  | LuxembourgBanks
  | NetherlandsBanks;

export const datasetsExtended: Record<string, FullCountriesResult> = {
  AT: at,
  BE: be,
  DE: de,
  ES: es,
  FR: fr,
  LU: lu,
  NL: nl,
};
