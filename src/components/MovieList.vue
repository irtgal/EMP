<template>
    <div class="movie-list">
        <div v-if="movies.length === 0">No movies found.</div>
        <div v-else class="q-gutter-md">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useMovieStore } from '../store/movieStore';
import MovieCard from './MovieCard.vue';

const movieStore = useMovieStore();

const movies = computed(() => movieStore.filteredMovies);
</script>

<style scoped>
.movie-list {
    display: flex;
    flex-direction: column;
}
</style>