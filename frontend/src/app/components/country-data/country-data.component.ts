import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService, PageResponse } from '../../services/country.service';
import { CountryDataRow, Region } from '../../models/county.model';

@Component({
  selector: 'app-country-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country-data.component.html',
  styleUrl: './country-data.component.css'
})
export class CountryDataComponent implements OnInit {
  countryData: CountryDataRow[] = [];
  regions: Region[] = [];
  
  selectedRegionId: number | undefined;
  yearFrom: number | undefined;
  yearTo: number | undefined;
  
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
    this.loadRegions();
    this.loadCountryData();
  }

  loadRegions(): void {
    this.countryService.getAllRegions().subscribe({
      next: (data) => {
        this.regions = data.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (err) => {
        console.error('Error loading regions:', err);
      }
    });
  }

  loadCountryData(): void {
    this.loading = true;
    this.countryService.getFilteredCountryDataPaginated(
      this.selectedRegionId,
      this.yearFrom,
      this.yearTo,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (response: PageResponse<CountryDataRow>) => {
        this.countryData = response.content;
        this.currentPage = response.currentPage;
        this.pageSize = response.pageSize;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isFirst = response.first;
        this.isLast = response.last;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading country data:', err);
        this.error = 'Failed to load country data. Please ensure your backend is running.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadCountryData();
  }

  clearFilters(): void {
    this.selectedRegionId = undefined;
    this.yearFrom = undefined;
    this.yearTo = undefined;
    this.currentPage = 0;
    this.loadCountryData();
  }

  nextPage(): void {
    if (!this.isLast) {
      this.currentPage++;
      this.loadCountryData();
    }
  }

  previousPage(): void {
    if (!this.isFirst) {
      this.currentPage--;
      this.loadCountryData();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCountryData();
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
