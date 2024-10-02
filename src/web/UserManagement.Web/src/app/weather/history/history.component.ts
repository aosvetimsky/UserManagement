import { Component } from '@angular/core';
import { ApiClient } from '../../../api/api-client';
import { AfterViewInit } from '@angular/core';
import { WeatherHistoryByMonth } from '../../../api/api-client-base.generated';
import { NotificationService } from '../../../services/notification-service';

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class WeatherHistoryComponent implements AfterViewInit {

  constructor(private apiClient: ApiClient,
    private notificationService: NotificationService
  ) {
  }

  private currentYear: number = new Date().getFullYear();

  // show last 20 years
  years: number[] = [...Array(20).keys()].map(y => this.currentYear - y);
  selectedYear: number = this.currentYear;

  graph = {
    data: [
      { x: [''], y: [1], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } }
    ],
    layout: {
      yaxis: {
        title: 'Celsius',
        showline: false
      }
    }
  };

  ngAfterViewInit(): void {
    this.loadWeatherHistoryForYear(this.currentYear);
  }

  selectedYearChanged() {
    this.loadWeatherHistoryForYear(this.selectedYear);
  }

  private loadWeatherHistoryForYear(year: number) {
    this.apiClient.weatherHistory(year).subscribe({
      next: response => {
        this.proceessHistoryEntries(response.entries!);
      },
      error: e => {
        this.notificationService.notifyError(e.response);
      }
    });
  }

  private proceessHistoryEntries(historyEntries: WeatherHistoryByMonth[]) {
    if (!historyEntries || historyEntries.length < 1) {
      return;
    }

    const months: string[] = [];
    const temperatures: number[] = [];

    historyEntries.forEach(e => {
      if (e.month && e.historyEntries) {
        months.push(e.month);
        const temperaturesForMonth = e.historyEntries.map(e => e.temperature!);
        const avgTemp = temperaturesForMonth.reduce((a, b) => a + b) / temperaturesForMonth.length;
        temperatures.push(avgTemp);
      }
    });

    this.graph.data[0].x = months;
    this.graph.data[0].y = temperatures;
  }
}

