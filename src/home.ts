import "./main";
import "./styles/home.scss";
import { Location } from "./@types/location.type";
import { Weather } from "./@types/weather.type";
import { getLocation } from "./utils/location.util";
import { getWeather } from "./utils/weather.util";
import { getNowPlayingAndUpcomingMovies } from "./utils/movie.util";
import { getNowPlayingAndUpcomingMoviesResponse } from "./@types/movie.type";
import { KAKAO_APP_KEY, OPEN_WEATHER_APP_ID, TMDB_BEARER_TOKEN, weatherIconMap } from "./config/config";
import element from "./elements/home.element.ts";

(async () => {
  const location: Location = await getLocation();
  console.log(location);
  const weatherData: Weather = await getWeather(location, OPEN_WEATHER_APP_ID, KAKAO_APP_KEY);
  console.log(weatherData);
  const movieData: getNowPlayingAndUpcomingMoviesResponse = await getNowPlayingAndUpcomingMovies(1, TMDB_BEARER_TOKEN);
  console.log(movieData);

  element.region.textContent = weatherData.region;
  element.temp.textContent = Math.ceil(weatherData.temp * 10) / 10 + "°";
  element.weather.textContent = weatherData.weather;
  element.pollution.textContent = weatherData.pollution;

  switch (weatherData.pollution) {
    case "나쁨": 
    case "최악": 
      element.pollution.style.color = "red";
      break;
    case "좋음": 
    case "괜찮음": 
    case "보통": 
      element.pollution.style.color = "blue";
      break;
  }

  element.weatherIcon.src = `/img/weather/Light bg/${weatherIconMap.get(weatherData.weatherIcon)}`; // 날씨 아이콘 (맵으로 생성 후 가져옴)

  movieData.results.slice(0, 3).forEach((movieItem) => {
    const liElement = document.createElement("li");
    
    liElement.classList.add("movieItem");

    const imgElement = document.createElement("img");

    imgElement.src = "https://image.tmdb.org/t/p/w300" + movieItem.poster_path;

    console.log("https://image.tmdb.org/t/p/w500" + movieItem.poster_path);
    imgElement.alt = movieItem.title;

    if(movieItem.isNowPlaying)
    {
      liElement.classList.add("nowshow");
    }
    else
    {
      liElement.classList.add("dday");
    }

    // const titleText = document.createTextNode(movieItem.title);

    liElement.appendChild(imgElement);
    // liElement.appendChild(titleText);

    element.movies.appendChild(liElement);
  });
})();
