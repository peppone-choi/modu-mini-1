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
  // movieData.results.slice(0, 3).forEach((movieItem) => {
  
  totalImages =  movieData.results.length;
  totalSlides = Math.ceil(totalImages / imagesPerSlide);
  // console.log(totalImages);

  movieData.results.forEach((movieItem) => {
    const liElement = document.createElement("li");
    
    liElement.classList.add("movieItem");
    liElement.classList.add("slider");

    const imgElement = document.createElement("img");

    imgElement.src = "https://image.tmdb.org/t/p/w300" + movieItem.poster_path;
    imgElement.alt = movieItem.title;

    if(movieItem.isNowPlaying) {
      // liElement.classList.add("nowshow");
    }
    else {
      // liElement.classList.add("dday");
    }

    // const titleText = document.createTextNode(movieItem.title);

    liElement.appendChild(imgElement);
    // liElement.appendChild(titleText);
    element.movies.appendChild(liElement);
  });
})();

// 요소를 가져오는 함수
const getElementById = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (element) {
    return element as T;
  } else {
    throw new Error(`Element with id "${id}" not found`);
  }
};

// 요소 가져오기
const sliderList = getElementById<HTMLUListElement>('movies');
const prevBtn = getElementById<HTMLButtonElement>('prev-btn');
const nextBtn = getElementById<HTMLButtonElement>('next-btn');

// 슬라이드 데이터
let totalImages: number = 0; // 총 이미지 개수 (동적으로 설정 가능)
let imagesPerSlide: number = 1;
let totalSlides: number = Math.ceil(totalImages / imagesPerSlide);
let currentSlideIndex: number = 0;

// 슬라이드 위치 업데이트 함수
const updateSliderPosition = () => {
  const sliderWidth = sliderList.clientWidth / imagesPerSlide;
  const offset = -(currentSlideIndex * sliderWidth);
  sliderList.style.transform = `translateX(${offset}px)`;
};

// 이전 버튼 클릭 이벤트
prevBtn.addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = totalSlides - 1; // 마지막 슬라이드로 이동
  }
  updateSliderPosition();
});

// 다음 버튼 클릭 이벤트
nextBtn.addEventListener('click', () => {
  if (currentSlideIndex < totalSlides - 1) {
    currentSlideIndex++;
  } else {
    currentSlideIndex = 0; // 첫 슬라이드로 이동
  }
  updateSliderPosition();
});

// 초기 위치 업데이트
updateSliderPosition();

// 윈도우 크기 변경 시 슬라이드 위치 업데이트
window.addEventListener('resize', updateSliderPosition);