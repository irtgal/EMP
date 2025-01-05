import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { IMovie, Movie, UserRating } from '../models/Movie';
import { fetchMovieDetails, fetchRecommendedMovies } from '../api/movieService';
import { LocalStorage } from 'quasar';

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
    if (rating < 1) {
      unRateMovie(movieId);
      return;
    }
    const existingRating = userRatings.value.find(r => r.movieId === movieId);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      userRatings.value.push({ movieId, rating });
      ratedMovies.value.push(movie);
    }
  };

  const unRateMovie = (movieId: number) => {
    const ratingIndex = userRatings.value.findIndex(r => r.movieId === movieId);
    if (ratingIndex > -1) {
      userRatings.value.splice(ratingIndex, 1);
    }

    const movieIndex = ratedMovies.value.findIndex(m => m.id === movieId);
    if (movieIndex > -1) {
      ratedMovies.value.splice(movieIndex, 1);
    }
  }

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


  // Persistance
    function loadStateFromStorage() {
      const savedRatedMovies = LocalStorage.getItem('ratedMovies') as IMovie[];
      const savedUserRatings = LocalStorage.getItem('userRatings') as UserRating[];
      if (savedRatedMovies) {
        ratedMovies.value = savedRatedMovies.map(data => new Movie(data));
      }
      if (savedUserRatings) {
        userRatings.value = savedUserRatings;
      }
    }
  
    function saveStateToStorage() {
      LocalStorage.set('ratedMovies', ratedMovies.value);
      LocalStorage.set('userRatings', userRatings.value);
    }
  
    // Watchers to Automatically Persist State
    watch(ratedMovies, saveStateToStorage, { deep: true });
    watch(userRatings, saveStateToStorage, { deep: true });
  
    // Initialize Store
    loadStateFromStorage();

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