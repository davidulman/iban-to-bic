import at from './at.json';
import be from './be.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';
import lu from './lu.json';
import nl from './nl.json';

export interface GetBicCode {
  [bankCode: string]: string;
}

export const datasets: Record<string, GetBicCode> = {
  AT: at,
  BE: be,
  DE: de,
  ES: es,
  FR: fr,
  LU: lu,
  NL: nl,
};
