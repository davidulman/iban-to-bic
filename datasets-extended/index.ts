import {
  AustrianBanks,
  BelgiumBanks,
  CzechBanks,
  FranceBanks,
  GermanBanks,
  LuxembourgBanks,
  NetherlandsBanks,
  SpainBanks,
  SwitzerlandBanks,
} from '../types/dataset-extended/types';
import at from './at.json';
import be from './be.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import lu from './lu.json';
import nl from './nl.json';
import ch from './ch.json';
import cz from './cz.json';

export type FullCountriesResult =
  | AustrianBanks
  | BelgiumBanks
  | GermanBanks
  | SpainBanks
  | FranceBanks
  | LuxembourgBanks
  | NetherlandsBanks
  | SwitzerlandBanks
  | CzechBanks;

export const datasetsExtended: Record<string, FullCountriesResult> = {
  AT: at,
  BE: be,
  DE: de,
  ES: es,
  FR: fr,
  LU: lu,
  NL: nl,
  CH: ch,
  CZ: cz,
};
