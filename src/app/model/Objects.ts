// All models

export class City {

    Key: string;

    LocalizedName: string;

    isFavorite: boolean = false;

    constructor(key: string, localizedName: string, isFavorite?: boolean) {
        this.Key = key;
        this.LocalizedName = localizedName;
        this.isFavorite = isFavorite;
    }
}


export class Condition {

    WeatherText: string;

    WeatherIcon?: number;

    HasPrecipitation: boolean;

    PrecipitationType: string;

    PrecipitationIntensity: string;

    Temperature: {

        Metric: {
            Value?: number;
        },

        Imperial: {
            Value?: number;
        }
    }

    constructor(WeatherText: string, HasPrecipitation: boolean, PrecipitationType: string, PrecipitationIntensity: string, Temperature?: number, ImpTemperature?: number, WeatherIcon?: number) {
        this.WeatherText = WeatherText;
        this.WeatherIcon = WeatherIcon;
        this.HasPrecipitation = HasPrecipitation;
        this.PrecipitationType = PrecipitationType;
        this.PrecipitationIntensity = PrecipitationIntensity;
        this.Temperature = { Metric: { Value: Temperature }, Imperial: { Value: ImpTemperature } };
    }
}


export class DailyForecast {

    Date: Date;

    Temperature: {

        Minimum: {
            Value?: number;
        },

        Maximum: {
            Value?: number;
        }
    }

    constructor(Date: Date, MaxTemperature?: number, MinTemperature?: number) {
        this.Date = Date;
        this.Temperature = { Minimum: { Value: MinTemperature }, Maximum: { Value: MaxTemperature } };
    }
}

export class FavoriteCities {

    Cities: {City: City, Condition: Condition}[] = [];
}

export class TemperatureType {

    Celsius: boolean = true;
}