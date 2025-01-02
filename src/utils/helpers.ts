import { IMovie, Movie } from '../models/Movie';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformMoviesResponse = (response: any) => ({
    ...response,
    results: response.results.map((movieData: IMovie) => new Movie(movieData)),
  });