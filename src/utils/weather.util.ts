import { Location } from "../@types/location.type";
import { Weather } from "../@types/weather.type";

export const getWeather = async (location: Location, OPEN_WEATHER_APP_ID: string, KAKAO_APP_KEY: string): Promise<Weather> => {
  const { latitude, longitude } = location; // 위도, 경도를 가져옴.
  // 위도, 경도를 이용하여 날씨 정보를 가져옴. openweathermap API 사용.
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.append("units", "metric");
  url.searchParams.append("lat", latitude.toString());
  url.searchParams.append("lon", longitude.toString());
  url.searchParams.append("appid", OPEN_WEATHER_APP_ID);
  url.searchParams.append("lang", "kr");
  const data = await (await fetch(url.toString())).json();

  // 미세 먼지 정보를 가져옴. openweathermap API 사용.
  const pollutionUrl = new URL("https://api.openweathermap.org/data/2.5/air_pollution");
  pollutionUrl.searchParams.append("lat", latitude.toString());
  pollutionUrl.searchParams.append("lon", longitude.toString());
  pollutionUrl.searchParams.append("appid", OPEN_WEATHER_APP_ID);
  pollutionUrl.searchParams.append("lang", "kr");
  const pollutionData = await (await fetch(pollutionUrl.toString())).json();
  data.pollution = pollutionData.list[0].main.aqi;

  // 위도, 경도를 이용하여 주소 정보를 가져옴. Kakao API 사용.
  const addressUrl = new URL("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json");
  addressUrl.searchParams.append("x", longitude.toString());
  addressUrl.searchParams.append("y", latitude.toString());
  addressUrl.searchParams.append("input_coord", "WGS84");
  addressUrl.searchParams.append("output_coord", "WGS84");
  const addressData = await (
    await fetch(addressUrl.toString(), {
      headers: {
        Authorization: `KakaoAK ${KAKAO_APP_KEY}`,
      },
    })
  ).json();

  return {
    weather: data.weather[0].description,
    weatherIcon: data.weather[0].icon,
    temp: data.main.temp,
    feelsLikeTemp: data.main.feels_like,
    clouds: data.clouds.all,
    pollution: data.pollution,
    region: addressData.documents[0].region_2depth_name,
  };
};
