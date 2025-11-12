import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CountryLanguage } from '../../models/county.model';

@Component({
  selector: 'app-country-languages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-languages.component.html',
  styleUrl: './country-languages.component.css'
})
export class CountryLanguagesComponent implements OnInit {
  countryId: number = 0;
  countryName: string = '';
  languages: CountryLanguage[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {
    // Get country name from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.countryName = navigation.extras.state['countryName'];
    }
  }

  ngOnInit(): void {
    // Get country ID from route parameters
    this.route.params.subscribe(params => {
      this.countryId = +params['id']; // + converts string to number
      this.loadLanguages();
    });
  }

  loadLanguages(): void {
    this.loading = true;
    this.countryService.getCountryLanguages(this.countryId).subscribe({
      next: (data) => {
        this.languages = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading languages:', err);
        this.error = 'Failed to load languages for this country.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/countries']);
  }
}
