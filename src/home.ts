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
import { Todo } from "./models/todo.model.ts";
import dayjs from "dayjs";

const todoList = JSON.parse(localStorage.getItem("todo") ?? JSON.stringify({}));

// 슬라이드 데이터
let totalImages: number = 0; // 총 이미지 개수 (동적으로 설정 가능)
let imagesPerSlide: number = 5;
let totalSlides: number = 0;
let currentSlideIndex: number = 0;

(async () => {
  const location: Location = await getLocation();
  console.log(location);
  const weatherData: Weather = await getWeather(location, OPEN_WEATHER_APP_ID, KAKAO_APP_KEY);
  console.log(weatherData);
  const movieData: getNowPlayingAndUpcomingMoviesResponse = await getNowPlayingAndUpcomingMovies(1, TMDB_BEARER_TOKEN);
  console.log(movieData);

  // 날씨 리스트 가져오기
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

  totalImages = movieData.results.length;
  totalSlides = Math.ceil(totalImages / imagesPerSlide);

  // 영화 리스트 가져오기
  movieData.results.reverse().forEach((movieItem) => {
    const liElement = document.createElement("li");

    liElement.classList.add("movieItem");
    liElement.classList.add("slider");

    const imgElement = document.createElement("img");

    imgElement.src = "https://image.tmdb.org/t/p/w300" + movieItem.poster_path;
    imgElement.alt = movieItem.title;

    const pElement = document.createElement("p");

    if (movieItem.isNowPlaying) {
      liElement.classList.add("nowshow");
      liElement.appendChild(imgElement);
    } else {
      pElement.textContent = movieItem.releaseDateMinus ? "D" + movieItem.releaseDateMinus.toString() : "";
      pElement.classList.add("dday");
      liElement.appendChild(imgElement);
      liElement.appendChild(pElement);
    }

    element.movies.appendChild(liElement);
  });
  const todayTodo = todoList.filter((elementItem: Todo) => {
    return (
      elementItem.startDay === dayjs(new Date()).format("YYYY-MM-DD") ||
      elementItem.endDay === dayjs(new Date()).format("YYYY-MM-DD") ||
      (dayjs(new Date()).isAfter(dayjs(elementItem.startDay)) && dayjs(new Date()).isBefore(dayjs(elementItem.endDay)))
    );
  });
  // todo List 가져오기
  todayTodo.forEach((elementItem: Todo) => {
    const todoliElement = document.createElement("li");
    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.checked = elementItem.isCompleted;
    inputElement.addEventListener("change", () => {
      elementItem.isCompleted = !elementItem.isCompleted;
      localStorage.setItem("todo", JSON.stringify(todoList));
    });
    const labelElement = document.createElement("label");

    inputElement.setAttribute("id", "inputId" + elementItem.id);
    labelElement.textContent = elementItem.content;
    labelElement.setAttribute("for", "inputId" + elementItem.id);

    const divElement = document.createElement("div");
    divElement.appendChild(inputElement);
    divElement.appendChild(labelElement);

    todoliElement.appendChild(divElement);

    element.todos.appendChild(todoliElement);
  });
})();

// 슬라이드 위치 업데이트 함수
const updateSliderPosition = () => {
  const sliderWidth = element.movies.clientWidth;
  const offset = -(currentSlideIndex * sliderWidth);
  element.movies.style.transform = `translateX(${offset}px)`;
};

// 이전 버튼 클릭 이벤트
element.prevBtn.addEventListener("click", () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = totalSlides - 1; // 마지막 슬라이드로 이동
  }
  updateSliderPosition();
});

// 다음 버튼 클릭 이벤트
element.nextBtn.addEventListener("click", () => {
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
window.addEventListener("resize", updateSliderPosition);
