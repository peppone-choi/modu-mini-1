import dayjs from "dayjs";
import { getNowPlayingAndUpcomingMoviesResponse } from "../@types/movie.type";

export const getNowPlayingAndUpcomingMovies = async (page: number, TMDB_BEARER_TOKEN: string): Promise<getNowPlayingAndUpcomingMoviesResponse> => {
  const movieData: getNowPlayingAndUpcomingMoviesResponse = {
    results: [],
  };
  const url = new URL("https://api.themoviedb.org/3/movie/now_playing");
  url.searchParams.append("language", "ko-KR");
  url.searchParams.append("page", page.toString());
  url.searchParams.append("region", "KR");
  const nowPlayingData = await (
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    })
  ).json();

  nowPlayingData.results.forEach((movie: any) => {
    movieData.results.push({
      backdrop_path: movie.backdrop_path,
      isNowPlaying: true,
      overview: movie.overview,
      poster_path: movie.poster_path,
      title: movie.title,
      release_date: movie.release_date,
    });
  });

  const upcomingUrl = new URL("https://api.themoviedb.org/3/movie/upcoming");
  upcomingUrl.searchParams.append("language", "ko-KR");
  upcomingUrl.searchParams.append("page", page.toString());
  upcomingUrl.searchParams.append("region", "KR");
  const upcomingData = await (
    await fetch(upcomingUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    })
  ).json();
  const day = dayjs(Date.now());
  upcomingData.results.forEach((movie: any) => {
    movieData.results.push({
      backdrop_path: movie.backdrop_path,
      isNowPlaying: false,
      overview: movie.overview,
      poster_path: movie.poster_path,
      releaseDateMinus: day.diff(movie.release_date, "day").valueOf(),
      title: movie.title,
      release_date: movie.release_date,
    });
  });

  movieData.results.sort((a, b) => {
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  });
  movieData.results = movieData.results.filter((movie) => {
    return (movie.releaseDateMinus && movie.releaseDateMinus < -7) || (movie.isNowPlaying && day.diff(movie.release_date, "day").valueOf() < 7);
  });
  return { ...movieData };
};
