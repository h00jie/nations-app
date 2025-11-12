// src/app/services/country.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country, CountryDataRow, CountryLanguage, CountryStats, Region } from '../models/county.model';

export interface PageResponse<T> {
  content: T[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:8080/api'; // Your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/countries`);
  }

  getCountryLanguages(countryId: number): Observable<CountryLanguage[]> {
    return this.http.get<CountryLanguage[]>(`${this.apiUrl}/countries/${countryId}/languages`);
  }

  getCountriesMaxGdpRatio(): Observable<CountryStats[]> {
    return this.http.get<CountryStats[]>(`${this.apiUrl}/countries/stats/max-gdp-ratio`);
  }

  getCountriesMaxGdpRatioPaginated(
    page: number = 0,
    size: number = 10
  ): Observable<PageResponse<CountryStats>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<CountryStats>>(
      `${this.apiUrl}/countries/stats/max-gdp-ratio`,
      { params }
    );
  }

  
  getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiUrl}/countries/regions`);
  }

  getFilteredCountryDataPaginated(
    regionId?: number, 
    yearFrom?: number, 
    yearTo?: number,
    page: number = 0,
    size: number = 10
  ): Observable<PageResponse<CountryDataRow>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (regionId) {
      params = params.set('regionId', regionId.toString());
    }
    if (yearFrom) {
      params = params.set('yearFrom', yearFrom.toString());
    }
    if (yearTo) {
      params = params.set('yearTo', yearTo.toString());
    }

    return this.http.get<PageResponse<CountryDataRow>>(
      `${this.apiUrl}/countries/country-data`, 
      { params }
    );
  }
}
