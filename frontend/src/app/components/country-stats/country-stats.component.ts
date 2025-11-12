// src/app/components/country-stats/country-stats.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CountryService, PageResponse } from '../../services/country.service';
import { CountryStats } from '../../models/county.model';


@Component({
  selector: 'app-country-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-stats.component.html',
  styleUrl: './country-stats.component.css'
})
export class CountryStatsComponent implements OnInit {
  countryStats: CountryStats[] = [];
  
  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;
  isFirst = true;
  isLast = false;
  
  loading = true;
  error = '';
  readonly Math = Math;

  constructor(
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCountryStats();
  }

  loadCountryStats(): void {
    this.loading = true;
    this.countryService.getCountriesMaxGdpRatioPaginated(
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (response: PageResponse<CountryStats>) => {
        this.countryStats = response.content;
        this.currentPage = response.currentPage;
        this.pageSize = response.pageSize;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isFirst = response.first;
        this.isLast = response.last;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading country stats:', err);
        this.error = 'Failed to load country statistics. Please ensure your backend is running.';
        this.loading = false;
      }
    });
  }

  calculateGdpPerCapita(stats: CountryStats): number {
    if (stats.population === 0) return 0;
    return stats.gdp / stats.population;
  }

  nextPage(): void {
    if (!this.isLast) {
      this.currentPage++;
      this.loadCountryStats();
    }
  }

  previousPage(): void {
    if (!this.isFirst) {
      this.currentPage--;
      this.loadCountryStats();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCountryStats();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(0, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible);
    
    if (end - start < maxVisible) {
      start = Math.max(0, end - maxVisible);
    }
    
    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
