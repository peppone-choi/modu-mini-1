import "./main";
import "./styles/home.scss";
import { Location } from "./@types/location.type";
import { Weather } from "./@types/weather.type";
import { getLocation } from "./utils/location.util";
import { getWeather } from "./utils/weather.util";
import { getNowPlayingAndUpcomingMovies } from "./utils/movie.util";
import { getNowPlayingAndUpcomingMoviesResponse } from "./@types/movie.type";

const OPEN_WEATHER_APP_ID = "63d4d5b5c3cc0f33e94516f7ef477238";
const TMDB_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2FiODczNDg0MGM3ZTg0YmRlZjg3ZThjY2EwYWNjYyIsIm5iZiI6MTcyMzUwNjM1MC41OTA3NjUsInN1YiI6IjY2MTBlMTMzYjA5YmRlMDE3ZWJjYmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.91Lkyh_Yp1fow-wBetsYkgGhp6Nvw5sm8GnutDrAAE0";
const KAKAO_APP_KEY = "d1b5860c56f56b199f2934b432965880";

(async () => {
  const location: Location = await getLocation();
  console.log(location);
  const weatherData: Weather = await getWeather(location, OPEN_WEATHER_APP_ID, KAKAO_APP_KEY);
  console.log(weatherData);
  const movie: getNowPlayingAndUpcomingMoviesResponse = await getNowPlayingAndUpcomingMovies(1, TMDB_BEARER_TOKEN);
  console.log(movie);
})();
