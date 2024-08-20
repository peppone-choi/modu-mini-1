import "./main";
import "./styles/home.scss";
import { Location } from "./@types/location.type";
import { Weather } from "./@types/weather.type";
import { getLocation } from "./utils/location.util";
import { getWeather } from "./utils/weather.util";
import { getNowPlayingAndUpcomingMovies } from "./utils/movie.util";
import { getNowPlayingAndUpcomingMoviesResponse } from "./@types/movie.type";
import { KAKAO_APP_KEY, OPEN_WEATHER_APP_ID, TMDB_BEARER_TOKEN } from "./config/config";

(async () => {
  const location: Location = await getLocation();
  console.log(location);
  const weatherData: Weather = await getWeather(location, OPEN_WEATHER_APP_ID, KAKAO_APP_KEY);
  console.log(weatherData);
  const movie: getNowPlayingAndUpcomingMoviesResponse = await getNowPlayingAndUpcomingMovies(1, TMDB_BEARER_TOKEN);
  console.log(movie);
})();
