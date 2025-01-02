import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Movie, FilterCriteria, UserRating } from '../models/Movie';

export const useMovieStore = defineStore('movieStore', () => {
  // state
  const movies = ref<Movie[]>([]);
  const currentPage = ref(1);
  const filterCriteria = ref<FilterCriteria>({});
  const userRatings = ref<UserRating[]>([]);


  // Actions
  const setFilterCriteria = (criteria: FilterCriteria) => {
    filterCriteria.value = criteria;
  };

  const rateMovie = (movieId: number, rating: number) => {
    const existingRating = userRatings.value.find(r => r.movieId === movieId);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      userRatings.value.push({ movieId, rating });
    }
  };

  // Getters
  const getMovieRating = computed(() => (movieId: number): number | null => {
    const rating = userRatings.value.find(r => r.movieId === movieId);
    return rating ? rating.rating : null;
  });

  return {
    // State
    movies,
    currentPage,
    filterCriteria,
    userRatings,

    // Actions
    setFilterCriteria,
    rateMovie,

    // Getters
    getMovieRating,
  };
});