<template>
    <div class="movie-list">
        <div v-if="movies.length === 0">No movies found.</div>
        <div v-else class="movie-grid">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
        <div class="text-center" v-if="movies.length > 0">
            {{ movies.length }} items
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
    gap: 16px;
}

.movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    padding: 16px;
}

@media (max-width: 768px) {}
</style>