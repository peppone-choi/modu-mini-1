import dayjs from "dayjs";
import { getNowPlayingAndUpcomingMoviesResponse } from "../@types/movie.type";

/**
 * @description 현재 상영중인 영화와 개봉 예정 영화 목록을 가져오는 API
 * @param {number} page - 페이지 번호
 * @param {string} TMDB_BEARER_TOKEN - TMDB API Bearer Token
 * @returns {Promise<getNowPlayingAndUpcomingMoviesResponse>} - API 응답
 */
export const getNowPlayingAndUpcomingMovies = async (page: number, TMDB_BEARER_TOKEN: string): Promise<getNowPlayingAndUpcomingMoviesResponse> => {
  const movieData: getNowPlayingAndUpcomingMoviesResponse = {
    results: [],
  }; // API 응답 데이터 초기화.
  const onAirUrl = new URL("https://api.themoviedb.org/3/movie/now_playing");
  const day = dayjs(Date.now()); // 현재 날짜를 가져옴.
  onAirUrl.searchParams.append("language", "ko-KR"); // 한국어로 설정
  onAirUrl.searchParams.append("page", page.toString()); // 페이지 번호 설정
  onAirUrl.searchParams.append("region", "KR"); // 개봉 지역 한국 설정
  const nowPlayingData = await (
    await fetch(onAirUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    })
  ).json(); // 현재 상영중인 영화 목록을 가져옴.

  nowPlayingData.results.forEach((movie: any) => {
    movieData.results.push({
      backdrop_path: movie.backdrop_path,
      isNowPlaying: true,
      overview: movie.overview,
      poster_path: movie.poster_path,
      title: movie.title,
      release_date: movie.release_date,
    });
  }); // 현재 상영중인 영화 목록을 API 응답 데이터에 추가. (더 나은 방안이 있을 수 있음)

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
  ).json(); // 개봉 예정 영화 목록을 가져옴.

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
  }); // 개봉 예정 영화 목록을 API 응답 데이터에 추가. (더 나은 방안이 있을 수 있음)

  movieData.results.sort((a, b) => {
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  }); // 개봉일 기준으로 정렬.

  movieData.results = movieData.results.filter((movie) => {
    return (movie.releaseDateMinus && movie.releaseDateMinus < -7) || (movie.isNowPlaying && day.diff(movie.release_date, "day").valueOf() < 7);
  }); // 개봉일 혹은 예정일이 앞뒤로 7일 이내인 영화만 필터링.
  return { ...movieData };
};
