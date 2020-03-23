import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "http://dataservice.accuweather.com/";
  private APIKey = "UmYeAyaujF32MGqZvaZnRNwnngm1HuSj";

  constructor(private httpClient: HttpClient) { }

  public getCitiesByGeoPosition(lat: string, long: string): Observable<any> { 

    let getCitiesURL = `${this.url}locations/v1/cities/geoposition/search?apikey=${this.APIKey}&q=${lat},${long}`;

    return this.httpClient.get(getCitiesURL)
      .pipe( 
          catchError(this.handleError)
      );
  }

  public getCities(searchText: string): Observable<any> { 

    let getCitiesURL = `${this.url}locations/v1/cities/autocomplete?apikey=${this.APIKey}&q=${searchText}`;

    return this.httpClient.get(getCitiesURL)
      .pipe( 
          catchError(this.handleError)
      );
  }

  public getCurrentCondition(locationKey: string): Observable<any> { 

    let getCurrentConditionURL = `${this.url}currentconditions/v1/${locationKey}?apikey=${this.APIKey}`;

    return this.httpClient.get(getCurrentConditionURL)
      .pipe( 
          catchError(this.handleError)
      );
  }
    
  public get5DaysForecasts(locationKey: string): Observable<any> { 

    let get5DaysForecastsURL = `${this.url}forecasts/v1/daily/5day/${locationKey}?apikey=${this.APIKey}&metric=true`;

    return this.httpClient.get(get5DaysForecastsURL)
      .pipe( 
          catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened, please try again later.');
  }

}
