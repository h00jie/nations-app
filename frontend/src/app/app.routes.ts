// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryLanguagesComponent } from './components/country-languages/country-languages.component';
import { CountryStatsComponent } from './components/country-stats/country-stats.component';
import { CountryDataComponent } from './components/country-data/country-data.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'countries/:id/languages', component: CountryLanguagesComponent },
  { path: 'country-stats', component: CountryStatsComponent },
  { path: 'country-data', component: CountryDataComponent },
  { path: '**', redirectTo: '' } // Redirect unknown routes to home
];
