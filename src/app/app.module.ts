import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';

import { FavoriteCities, TemperatureType } from './model/Objects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { WeatherComponent } from './weather/weather.component';
import { DayForcastComponent } from './weather/day-forcast/day-forcast.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    WeatherComponent,
    DayForcastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AutoCompleteModule,
    ToastModule,
    SelectButtonModule
  ],
  exports: [
    DayForcastComponent
  ],
  providers: [FavoriteCities, TemperatureType],
  bootstrap: [AppComponent]
})
export class AppModule { }
