import { Component, OnInit } from '@angular/core';

import { City, FavoriteCities, Condition } from './../model/Objects';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(public FavoriteCities: FavoriteCities) { }

  ngOnInit(): void {
  }

  routeTo(city: City) {
    this.FavoriteCities.Cities[0].Condition.Temperature.Metric.Value
  }

}