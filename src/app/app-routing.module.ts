import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesComponent } from './favorites/favorites.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
    { path: '', redirectTo: 'weather', pathMatch: 'full' },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'weather', component: WeatherComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
