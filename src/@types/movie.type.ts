export type getNowPlayingAndUpcomingMoviesResponse = {
  results: Array<Movie>;
};

export type Movie = {
  backdrop_path: string;
  overview: string;
  poster_path: string;
  isNowPlaying: boolean;
  releaseDateMinus?: number;
  release_date: string;
  title: string;
};
