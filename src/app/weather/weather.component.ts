import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';

import { ApiService } from '../api.service'
import { City, Condition, DailyForecast, FavoriteCities } from './../model/Objects';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [MessageService]
})
export class WeatherComponent implements OnInit {
  
  cities: City[];
  searchForm: FormGroup;
  get f() { return this.searchForm.controls; }

  currentCity: City;
  currentCondition: Condition;
  dailyForecasts: DailyForecast[];

  sub;

  constructor(private fb: FormBuilder, private messageService: MessageService, 
    public apiService: ApiService, public FavoriteCities: FavoriteCities, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.searchForm = this.fb.group({
      city: ['', Validators.pattern('^[a-zA-Z ]*')]
    });

    // Defaults to 'Tel Aviv' if no query param provided.
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.currentCity = new City(params['key'] || "215854", params['city'] || "Tel Aviv", params['key'] ? true : false);
    });


    // this.selectCity(this.currentCity);
    this.currentCondition = new Condition("Clear", false, null, null, 11.6, 33);
    this.dailyForecasts = [
      new DailyForecast(new Date("2020-03-22T07:00:00+02:00"), 18.4, 8.3),
      new DailyForecast(new Date("2020-03-23T07:00:00+02:00"), 23.4, 15.2),
      new DailyForecast(new Date("2020-03-24T07:00:00+02:00"), 22.4, 12.3),
      new DailyForecast(new Date("2020-03-25T07:00:00+02:00"), 20.4, 11.3),
      new DailyForecast(new Date("2020-03-26T07:00:00+02:00"), 24.4, 16.3),
    ];
  }

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
        this.messageService.add({severity:'error', summary:'Server Error', detail: error});
      }
    );
  }

  selectCity(event: City) {

    this.currentCity = event;

    this.apiService.getCurrentCondition(this.currentCity.Key)
    .subscribe(
      (data: any) => {
          this.currentCondition = data[0];
      },
      error => {
          this.messageService.add({severity:'error', summary:'Server Error', detail: error});
      }
    );

    this.apiService.get5DaysForecasts(this.currentCity.Key)
    .subscribe(
      (data: any) => {
          this.dailyForecasts = data["DailyForecasts"];
      },
      error => {          
        this.messageService.add({severity:'error', summary:'Server Error', detail: error});
      }
    );

  }

  setFavorite() {

    this.currentCity.isFavorite = !this.currentCity.isFavorite;

    if (this.currentCity.isFavorite) {
      this.FavoriteCities.Cities.push( {City: this.currentCity, Condition: this.currentCondition});
    }
    else {
      this.FavoriteCities.Cities = this.FavoriteCities.Cities.filter(city => city.City.Key != this.currentCity.Key);
    }
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
