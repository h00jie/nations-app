import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  menuItems = [
    {
      title: 'Task 1: Countries & Languages',
      description: 'View list of countries and their spoken languages',
      route: '/countries',
      icon: '🌍'
    },
    {
      title: 'Task 2: Country Stats (Max GDP Ratio)',
      description: 'View countries with maximum GDP per population ratio',
      route: '/country-stats',
      icon: '📊'
    },
    {
      title: 'Task 3: Advanced Country Data',
      description: 'Filter and view comprehensive country data',
      route: '/country-data',
      icon: '🔍'
    }
  ];
}
