/**
 * Weather type
 * @typedef {Object} Weather
 * @property {WeatherData} weather - 날씨 데이터
 * @property {WeatherMainData} main - 날시 메인 데이터
 * @property {number} temp - 온도
 * @property {number} feels_like - 체감 온도
 * @property {number} clouds - 구름 정보
 * @property {string} pollution - 미세먼지 정보
 * @property {string} region - 지역
 */

export type Weather = {
  weather: string;
  weatherIcon: string;
  temp: number;
  feelsLikeTemp: number;
  clouds: number;
  pollution: string;
  region: string;
};
