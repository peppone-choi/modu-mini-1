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
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      genre_ids: movie.genre_ids,
      id: movie.id,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    });
  });

  const upcomingUrl = new URL("https://api.themoviedb.org/3/movie/upcoming");
  upcomingUrl.searchParams.append("language", "ko-KR");
  upcomingUrl.searchParams.append("page", page.toString());
  upcomingUrl.searchParams.append("region", "KR");
  const upcomingData = await (
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    })
  ).json();

  upcomingData.results.forEach((movie: any) => {
    movieData.results.push({
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      genre_ids: movie.genre_ids,
      id: movie.id,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    });
  });

  movieData.results.sort((a, b) => {
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  });

  return { ...movieData };
};
