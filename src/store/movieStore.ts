import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Movie, FilterCriteria, UserRating } from '../models';
import moviesData from '../data/movies.json';

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Movie[]>(moviesData);
  const filterCriteria = ref<FilterCriteria>({});
  const userRatings = ref<UserRating[]>([]);

  const filteredMovies = computed(() => {
    return movies.value.filter(movie => {
      // Filter by genres
      if (filterCriteria.value.genres?.length) {
        if (!filterCriteria.value.genres.some(genre => movie.genres.includes(genre))) {
          return false;
        }
      }

      // Filter by release year
      if (filterCriteria.value.releaseYear) {
        if (movie.releaseYear !== filterCriteria.value.releaseYear) {
          return false;
        }
      }

      // Filter by search query
      if (filterCriteria.value.searchQuery) {
        const query = filterCriteria.value.searchQuery.toLowerCase();
        if (!movie.title.toLowerCase().includes(query)) {
          return false;
        }
      }

      return true;
    });
  });

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

    // Update the movie's userRating
    const movie = movies.value.find(m => m.id === movieId);
    if (movie) {
      movie.userRating = rating;
    }
  };

  return {
    movies,
    filteredMovies,
    setFilterCriteria,
    rateMovie,
  };
});