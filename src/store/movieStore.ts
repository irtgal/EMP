import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Movie, UserRating } from '../models/Movie';

export const useMovieStore = defineStore('movieStore', () => {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const userRatings = ref<UserRating[]>([]);
  const ratedMovies = ref<Movie[]>([]); 

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

    // Getters
    getMovieRating,
  };
});