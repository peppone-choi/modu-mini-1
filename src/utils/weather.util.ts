import { Location } from "../@types/location.type";
import { Weather } from "../@types/weather.type";

export const getWeather = async (location: Location, APP_ID: string): Promise<Weather> => {
  const { latitude, longitude } = location;
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.append("units", "metric");
  url.searchParams.append("lat", latitude.toString());
  url.searchParams.append("lon", longitude.toString());
  url.searchParams.append("appid", APP_ID);
  const data = (await fetch(url.toString())).json();
  return await data;
};
