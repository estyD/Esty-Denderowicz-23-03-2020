import { Component, OnInit } from '@angular/core';

import { City, FavoriteCities, Condition, TemperatureType } from './../model/Objects';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(public FavoriteCities: FavoriteCities, public TemperatureType: TemperatureType) { }

  ngOnInit(): void {
  }

}