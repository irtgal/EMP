<template>
    <div v-if="props.movies.length" class="movie-list">
        <div class="movie-grid">
            <MovieCard v-for="movie in props.movies" :key="movie.id" :movie="movie" />
        </div>
        <div class="text-center">
            {{ props.movies.length }} items
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Movie } from '../models';
import MovieCard from './MovieCard.vue';

const props = defineProps<{
    movies: Movie[];
}>();
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

@media (max-width: 768px) {
    .movie-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}
</style>