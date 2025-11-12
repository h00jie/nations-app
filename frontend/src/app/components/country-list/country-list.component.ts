import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/county.model';


@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  loading = true;
  error = '';

  constructor(
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.loading = true;
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data.sort((a, b) => a.name.localeCompare(b.name));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading countries:', err);
        this.error = 'Failed to load countries. Please ensure your backend is running.';
        this.loading = false;
      }
    });
  }

  viewLanguages(country: Country): void {
    this.router.navigate(['/countries', country.countryId, 'languages'], {
      state: { countryName: country.name }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
