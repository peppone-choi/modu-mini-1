/**
 * @description getNowPlayingAndUpcomingMovies API response type
 * @typedef {Object} getNowPlayingAndUpcomingMoviesResponse
 * @property {Array<Movie>} results - 영화 목록
 */
export type getNowPlayingAndUpcomingMoviesResponse = {
  results: Array<Movie>;
};

/**
 * @description Movie type
 * @typedef {Object} Movie
 * @property {string} backdrop_path - 백드롭 이미지 경로
 * @property {string} overview - 영화 개요
 * @property {string} poster_path - 포스터 이미지 경로
 * @property {boolean} isNowPlaying - 현재 상영중 여부
 * @property {number} releaseDateMinus - 개봉일까지 남은 일수
 * @property {string} release_date - 개봉일
 * @property {string} title - 영화 제목
 * @example
 * {
 * backdrop_path: "/path",
 * overview: "overview",
 * poster_path: "/path",
 * isNowPlaying: true,
 * releaseDateMinus: -1,
 * release_date: "2021-08-01",
 * title: "title",
 * }
 *
 */
export type Movie = {
  backdrop_path: string;
  overview: string;
  poster_path: string;
  isNowPlaying: boolean;
  releaseDateMinus?: number;
  release_date: string;
  title: string;
};
