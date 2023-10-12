import axios, { AxiosInstance } from "axios";

interface IGetWeatherInput {
  lat: string;
  lon: string;
}

interface IWeatherReport {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: { all: number };
  dt: number; // Unix time
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number; // Unix time
    sunset: number; // Unix time
  };
  timezone: number;
  id: number;
  name: string; // City,
  cod: number;
  rain: {
    "1h"?: number;
    "3h"?: number;
  };
  snow: {
    "1h"?: number;
    "3h"?: number;
  };
}

interface IWeatherSummary {
  temperature: "Freezing" | "Cold" | "Chilly" | "Warm" | "Hot" | "Very hot";
  humidity: "Dry" | "Humid" | "Very humid";
  weather: string;
  visibility: "Clear" | "Fog" | "Misty" | "Haze";
  wind:
    | "Calm"
    | "Light breeze"
    | "Moderate breeze"
    | "Strong breeze"
    | "Fresh gale"
    | "Strong gale"
    | "Whole gale"
    | "Storm"
    | "Hurricane";
  cloud: "Clear" | "Some clouds" | "Cloudy";
  rain: "None" | "Light" | "Moderate" | "Heavy" | "Very heavy";
  snow: "None" | "Light" | "Moderate" | "Heavy" | "Very heavy";
}

export interface IGetWeatherResult {
  raw: IWeatherReport;
  summary: IWeatherSummary;
}

export class WeatherService {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: "https://api.openweathermap.org/data/2.5",
    });
    this.client.interceptors.request.use((config) => {
      config.params = {
        appid: process.env.OPENWEATHER_SECRET as string,
      };
      return config;
    });
  }

  public async getWeather({
    lat,
    lon,
  }: IGetWeatherInput): Promise<IGetWeatherResult> {
    const weather = await this.client.get<IWeatherReport>(
      `/weather?lat=${lat}&lon=${lon}`
    );
    return {
      raw: weather.data,
      summary: this.summarizeWeather(weather.data),
    };
  }

  private summarizeWeather(weatherRaw: IWeatherReport): IWeatherSummary {
    const { weather } = weatherRaw;
    return {
      temperature: this.summarizeTemperature(weatherRaw.main),
      humidity: this.summarizeHumidity(weatherRaw.main.humidity),
      weather: weatherRaw.weather[0].main,
      visibility: this.summarizeVisibility(weatherRaw.visibility),
      wind: this.summarizeWind(weatherRaw.wind),
      cloud: this.summarizeCloud(weatherRaw.clouds),
      rain: this.summarizeRainSnow(weatherRaw.rain),
      snow: this.summarizeRainSnow(weatherRaw.snow),
    };
  }

  private summarizeTemperature(
    data: IWeatherReport["main"]
  ): IWeatherSummary["temperature"] {
    const celcius = data.temp - 273.15;
    if (celcius < 0) {
      return "Freezing";
    }
    if (celcius < 10) {
      return "Cold";
    }
    if (celcius < 15) {
      return "Chilly";
    }
    if (celcius < 23) {
      return "Warm";
    }
    if (celcius < 35) {
      return "Hot";
    }
    return "Very hot";
  }

  private summarizeHumidity(
    humidity: IWeatherReport["main"]["humidity"]
  ): IWeatherSummary["humidity"] {
    if (humidity < 55) {
      return "Dry";
    }

    if (humidity < 65) {
      return "Humid";
    }

    return "Very humid";
  }

  private summarizeVisibility(
    vis: IWeatherReport["visibility"]
  ): IWeatherSummary["visibility"] {
    if (vis < 1000) {
      return "Fog";
    }

    if (vis < 2000) {
      return "Misty";
    }

    if (vis < 5000) {
      return "Haze";
    }

    return "Clear";
  }

  private summarizeWind(wind: IWeatherReport["wind"]): IWeatherSummary["wind"] {
    const { speed } = wind;
    if (speed < 0.5) {
      return "Calm";
    }
    if (speed < 5) {
      return "Light breeze";
    }
    if (speed < 8) {
      return "Moderate breeze";
    }
    if (speed < 13.5) {
      return "Strong breeze";
    }
    if (speed < 20) {
      return "Fresh gale";
    }
    if (speed < 23.5) {
      return "Strong gale";
    }
    if (speed < 27.5) {
      return "Whole gale";
    }
    if (speed < 31.5) {
      return "Storm";
    }
    return "Hurricane";
  }

  private summarizeCloud(
    cloud: IWeatherReport["clouds"]
  ): IWeatherSummary["cloud"] {
    const { all } = cloud;
    if (all < 10) {
      return "Clear";
    }
    if (all < 50) {
      return "Some clouds";
    }

    return "Cloudy";
  }

  private summarizeRainSnow(
    rain: IWeatherReport["rain"]
  ): IWeatherSummary["rain"] {
    const oneHr = rain?.["1h"];
    const threeHr = rain?.["3h"];
    if (!oneHr || !threeHr) {
      return "None";
    }

    if (oneHr < 0.5 || threeHr < 0.5) {
      return "Light";
    }

    if (oneHr < 4 || threeHr < 4) {
      return "Moderate";
    }
    if (oneHr < 8 || threeHr < 8) {
      return "Heavy";
    }

    return "Very heavy";
  }
}
