import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';

import { TemperatureType } from './../../model/Objects';

@Component({
  selector: 'app-day-forcast',
  templateUrl: './day-forcast.component.html',
  styleUrls: ['./day-forcast.component.scss']
})
export class DayForcastComponent implements OnInit {

  @Input() day : string;
  @Input() temperature : string;

  constructor(public TemperatureType: TemperatureType) { }

  ngOnInit(): void {
  }

}
