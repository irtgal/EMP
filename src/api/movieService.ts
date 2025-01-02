import axios from 'axios';
import { Genre } from 'src/models/Movie';
import { Movie } from '../models/Movie';
import { transformMoviesResponse } from '../utils/helpers';

const TMDB_API_KEY = 'b559bb9e87948c72770f5e02547737c9';
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});



export const fetchPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get('/movie/popular', { params: { page } });
  return transformMoviesResponse(response.data);
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query, page },
  });
  return transformMoviesResponse(response.data);
};

export const fetchMovieDetails = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return new Movie(response.data); // Single movie transformed into the Movie class
};

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await tmdbApi.get('/genre/movie/list');
  return response.data.genres;
};