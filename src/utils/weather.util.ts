import { Location } from "../@types/location.type";
import { Weather } from "../@types/weather.type";

export const getWeather = async (location: Location, APP_ID: string): Promise<Weather> => {
  const { latitude, longitude } = location;
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.append("units", "metric");
  url.searchParams.append("lat", latitude.toString());
  url.searchParams.append("lon", longitude.toString());
  url.searchParams.append("appid", APP_ID);
  const data = await (await fetch(url.toString())).json();

  const pollutionUrl = new URL("https://api.openweathermap.org/data/2.5/air_pollution");
  pollutionUrl.searchParams.append("lat", latitude.toString());
  pollutionUrl.searchParams.append("lon", longitude.toString());
  pollutionUrl.searchParams.append("appid", APP_ID);
  const pollutionData = await (await fetch(pollutionUrl.toString())).json();
  data.pollution = pollutionData.list[0].main.aqi;
  return await data;
};
