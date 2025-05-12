export type CityName = 'Casablanca' | 'Rabat' | 'Marrakech' | 'Tanger' | 'Fès' | 'Agadir';

export type CitySectors = {
  [key in CityName]: string[];
};

export interface CityData {
  name: CityName;
  sectors: string[];
}
