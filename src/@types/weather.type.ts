export type Weather = {
  weather: Array<WeatherData>;
  main: Array<WeatherMainData>;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  id: number;
  name: string;
  cod: number;
};

export type WeatherData = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherMainData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};
