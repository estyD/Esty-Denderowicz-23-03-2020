import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { TemperatureType } from './model/Objects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Declare the values for select temperature-type select

  types: SelectItem[];
  SelectType = true;

  constructor(public TemperatureType: TemperatureType) {

    this.types = [
      { label: '°C', value: true },
      { label: '°F', value: false }
    ];
  }

  onSelectType(event) {
    this.TemperatureType.Celsius = event["value"];
  }
}
