const $ = {
  weatherIcon: document.querySelector("#weatherIcon") as HTMLImageElement,
  region: document.querySelector("#region") as HTMLLIElement,
  temp: document.querySelector("#temp") as HTMLLIElement,
  weather: document.querySelector("#weather") as HTMLLIElement,
  pollution: document.querySelector("#pollution") as HTMLLIElement,
  movies: document.querySelector("#movies") as HTMLUListElement,
  prevBtn: document.querySelector("#prev-btn") as HTMLLIElement,
  nextBtn: document.querySelector("#next-btn") as HTMLLIElement,
  todos: document.querySelector("#todos") as HTMLUListElement,
};

export default $;
