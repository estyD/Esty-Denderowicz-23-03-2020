import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ApiService } from '../api.service'
import { City, Condition, DailyForecast, FavoriteCities, TemperatureType } from './../model/Objects';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [MessageService]
})
export class WeatherComponent implements OnInit {

  cities: City[];

  searchForm: FormGroup;

  currentCity: City;

  currentCondition: Condition;

  dailyForecasts: DailyForecast[];

  sub: any;

  flagTempType: boolean;

  get f() { return this.searchForm.controls; }

  constructor(private fb: FormBuilder, private messageService: MessageService,
    public apiService: ApiService, public FavoriteCities: FavoriteCities, private route: ActivatedRoute,
    public TemperatureType: TemperatureType) {

    this.flagTempType = this.TemperatureType.Celsius;
  }

  //Check if the Temperature type has changed from header
  ngAfterViewChecked() {
    if (this.flagTempType != this.TemperatureType.Celsius) {
      this.flagTempType = this.TemperatureType.Celsius;
      this.get5DaysForecasts();
    }
  }

  ngOnInit(): void {

    // Validate 'english letter only' in autoComplete search
    this.searchForm = this.fb.group({
      city: ['', Validators.pattern('^[a-zA-Z ]*')]
    });

    // Defaults to current location if no query param provided from Favorite page.
    this.sub = this.route
      .queryParams
      .subscribe(params => {

        if (params['key']) {
          this.currentCity = new City(params['key'], params['city'], true);
          this.selectCity(this.currentCity);
        }

        else if (!navigator.geolocation) {
          this.messageService.add({ severity: 'error', summary: 'Geolocation Error', detail: 'Geolocation is not supported by your browser' });
        }

        else {
          navigator.geolocation.getCurrentPosition(
            (data: any) => {
              this.searchCityByGeoPosition(data["coords"]["latitude"], data["coords"]["longitude"])
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Geolocation Error', detail: 'Geolocation is not supported by your browser' });
            }
          );
        }

      });
  }

  //Get city key by geo-position
  searchCityByGeoPosition(lat, long) {

    this.apiService.getCitiesByGeoPosition(lat, long)
      .subscribe(
        (data: any) => {

          this.currentCity = data;

          var favoriteCity = this.FavoriteCities.Cities.find(c => c.City.Key == this.currentCity.Key);
          this.currentCity.isFavorite = favoriteCity ? true : false;

          this.selectCity(this.currentCity);
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Server Error', detail: error });
        }
      );
  }

  //AutoComplete search
  searchCity(event) {

    if (this.searchForm.invalid) {
      return;
    }

    this.apiService.getCities(event.query)
      .subscribe(
        (data: any) => {
          this.cities = data;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Server Error', detail: error });
        }
      );
  }

  //Get the current weather of the searched location or default location.
  selectCity(event: City) {

    this.currentCity = event;

    this.apiService.getCurrentCondition(this.currentCity.Key)
      .subscribe(
        (data: any) => {
          this.currentCondition = data[0];
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Server Error', detail: error });
        }
      );

    this.get5DaysForecasts();

  }

  // Get the 5-day forecast of the searched location or default location.
  get5DaysForecasts() {

    this.apiService.get5DaysForecasts(this.currentCity.Key, this.TemperatureType.Celsius)
      .subscribe(
        (data: any) => {
          this.dailyForecasts = data["DailyForecasts"];
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Server Error', detail: error });
        }
      );
  }

  setFavorite() {

    this.currentCity.isFavorite = !this.currentCity.isFavorite;

    if (this.currentCity.isFavorite) {
      this.FavoriteCities.Cities.push({ City: this.currentCity, Condition: this.currentCondition });
    }
    else {
      this.FavoriteCities.Cities = this.FavoriteCities.Cities.filter(city => city.City.Key != this.currentCity.Key);
    }
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
