import { IMovie, Movie } from '../models/Movie';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformMoviesResponse = (response: any) => ({
    ...response,
    results: response.results.map((movieData: IMovie) => new Movie(movieData)),
  });


  export function rehydrateMovie(movieData: IMovie): Movie {
    const rehydratedMovie = new Movie(movieData);
  
    if (movieData.recommendedMovies) {
      rehydratedMovie.recommendedMovies = movieData.recommendedMovies.map((recMovie) =>
        rehydrateMovie(recMovie)
      );
    }
  
    return rehydratedMovie;
  }