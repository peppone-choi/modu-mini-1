/**
 * Weather type
 * @typedef {Object} Weather
 * @property {Array<WeatherData>} weather - 날씨 데이터
 * @property {Array<WeatherMainData>} main - 날시 메인 데이터
 * @property {Object} clouds - 구름 정보
 * @property {number} clouds.all - 전체 구름 정보
 * @property {number} id - ID
 * @property {number} pollution - 미세먼지
 */

export type Weather = {
  weather: Array<WeatherData>;
  main: Array<WeatherMainData>;
  clouds: {
    all: number;
  };
  id: number;
  pollution: number;
};

/**
 * Weather data type
 * @typedef {Object} WeatherData
 * @property {number} id - ID
 * @property {string} main - 메인
 * @property {string} description - 설명
 * @property {string} icon - 아이콘
 */
export type WeatherData = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

/**
 * Weather main data type
 * @typedef {Object} WeatherMainData
 * @property {number} temp - 온도
 * @property {number} feels_like - 체감 온도
 */
export type WeatherMainData = {
  temp: number;
  feels_like: number;
};
