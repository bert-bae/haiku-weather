/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * tsoa-example
 * OpenAPI spec version: 1.0.0
 */
import type { IWeatherReportCoord } from './iWeatherReportCoord';
import type { IWeatherReportWeatherItem } from './iWeatherReportWeatherItem';
import type { IWeatherReportMain } from './iWeatherReportMain';
import type { IWeatherReportWind } from './iWeatherReportWind';
import type { IWeatherReportClouds } from './iWeatherReportClouds';
import type { IWeatherReportSys } from './iWeatherReportSys';
import type { IWeatherReportRain } from './iWeatherReportRain';
import type { IWeatherReportSnow } from './iWeatherReportSnow';

export interface IWeatherReport {
  coord: IWeatherReportCoord;
  weather: IWeatherReportWeatherItem[];
  base: string;
  main: IWeatherReportMain;
  visibility: number;
  wind: IWeatherReportWind;
  clouds: IWeatherReportClouds;
  dt: number;
  sys: IWeatherReportSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  rain: IWeatherReportRain;
  snow: IWeatherReportSnow;
}
