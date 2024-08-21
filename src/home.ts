import "./main";
import "./styles/home.scss";
import { Location } from "./@types/location.type";
import { Weather } from "./@types/weather.type";
import { getLocation } from "./utils/location.util";
import { getWeather } from "./utils/weather.util";
import { getNowPlayingAndUpcomingMovies } from "./utils/movie.util";
import { getNowPlayingAndUpcomingMoviesResponse } from "./@types/movie.type";
import { KAKAO_APP_KEY, OPEN_WEATHER_APP_ID, TMDB_BEARER_TOKEN } from "./config/config";
import "./elements/home.element.ts";

const weatherImages = {
  "rain" : "../public/img/weather/Light bg/DAY shower rain.svg",
};

(async () => {
  const location: Location = await getLocation();
  console.log(location);
  const weatherData: Weather = await getWeather(location, OPEN_WEATHER_APP_ID, KAKAO_APP_KEY);
  console.log(weatherData);
  const movieData: getNowPlayingAndUpcomingMoviesResponse = await getNowPlayingAndUpcomingMovies(1, TMDB_BEARER_TOKEN);
  console.log(movieData);

  region.textContent = "위치 : " + weatherData.region;
  temp.textContent = "온도 : " + weatherData.temp;
  weather.textContent = "날씨 : " + weatherData.weather;
  pollution.textContent = "미세먼지 : " + weatherData.pollution;
  
  weatherIcon.src = weatherImages.rain;
  
  movieData.results.slice(0, 3 ).forEach((movieItem) => {
    const liElement = document.createElement("li");

    liElement.classList.add("movieItem");

    const imgElement = document.createElement("img");

    imgElement.src = 'https://image.tmdb.org/t/p/w300' + movieItem.poster_path;
    
    console.log('https://image.tmdb.org/t/p/w500' + movieItem.poster_path);
    imgElement.alt = movieItem.title;

    const titleText = document.createTextNode(movieItem.title);

    liElement.appendChild(imgElement);
    liElement.appendChild(titleText);

    movies.appendChild(liElement);

  });
})();

// function getMeatherImage(weatherCondition) {
//   return weatherImages[weatherCondition.toLowerCase ]

// }

// function getWeatherImage(weatherCondition: WeatherCondition): string {
//   return weatherImages[weatherCondition] || "images/default.jpg";
// }

// function setWeatherImage(weatherCondition: WeatherCondition): void {
//   const imageElement = document.querySelector<HTMLImageElement>("#weather-image");
  
//   if (imageElement) {
//     const imageUrl = getWeatherImage(weatherCondition);
//     imageElement.src = imageUrl;
//   } else {
//     console.error("이미지 요소를 찾을 수 없습니다.");
//   }
// }