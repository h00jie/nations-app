export interface Country {
  countryId: number;
  name: string;
  area: number;
  countryCode2: string;
  countryCode3?: string;
  nationalDay?: Date;
  regionId: number;
}

export interface Language {
  languageId: number;
  languageName: string;
}

export interface CountryLanguage {
  countryId: number;
  languageId: number;
  official?: boolean;
  language: string; // Changed from languageName to language to match backend
}

export interface CountryStats {
  countryId: number;
  countryName: string;
  countryCode3: string;
  year: number;
  population: number;
  gdp: number;
}

export interface Region {
  regionId: number;
  name: string;
  continentId: number;
}

export interface Continent {
  continentId: number;
  name: string;
}

export interface CountryDataRow {
  continentName: string;
  regionName: string;
  countryName: string;
  year: number;
  population: number;
  gdp: number;
}
