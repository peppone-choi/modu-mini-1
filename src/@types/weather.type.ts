export type Weather = {
  weather: Array<WeatherData>;
  main: Array<WeatherMainData>;
  clouds: {
    all: number;
  };
  id: number;
  name: string;
  cod: number;
  pollution: number;
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
};
