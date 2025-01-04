import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Movie, UserRating } from '../models/Movie';
import { fetchMovieDetails, fetchRecommendedMovies } from '../api/movieService';

export const useMovieStore = defineStore('movieStore', () => {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const userRatings = ref<UserRating[]>([]);
  const ratedMovies = ref<Movie[]>([]);
  const cachedMovies = ref<Movie[]>([]);

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  const rateMovie = (movie: Movie, rating: number) => {
    const movieId = movie.id;
    const existingRating = userRatings.value.find(r => r.movieId === movieId);

    if (existingRating) {
      existingRating.rating = rating;
    } else {
      userRatings.value.push({ movieId, rating });
      ratedMovies.value.push(movie);
    }
  };

  const fetchAndCacheMovieDetails = async (movieId: number): Promise<Movie> => {
    const existingIndex = cachedMovies.value.findIndex(m => m.id === movieId);
    if (existingIndex > -1) {
      return cachedMovies.value[existingIndex];
    }
    try {
      const [movie, recommendations] = await Promise.all([
        fetchMovieDetails(movieId),
        fetchRecommendedMovies(movieId),
      ]);
      movie.recommendedMovies = recommendations.results;
      cachedMovies.value.push(movie);
      return movie;
    } catch (error) {
      console.error('Error fetching and caching movie details:', error);
      throw error; // re-throw so the caller can handle it
    }
  };

  // ---------------------------------------------------------------------------
  // Getters
  // ---------------------------------------------------------------------------
  const getMovieRating = computed(() => (movieId: number): number | null => {
    const rating = userRatings.value.find(r => r.movieId === movieId);
    return rating ? rating.rating : null;
  });

  return {
    // State
    userRatings,
    ratedMovies,

    // Actions
    rateMovie,
    fetchAndCacheMovieDetails,

    // Getters
    getMovieRating,
  };
});