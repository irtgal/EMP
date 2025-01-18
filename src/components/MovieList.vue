<template>
    <div v-if="props.movies.length" class="movie-list">

        <div v-if="layout === 'grid'" class="movie-grid">
            <MovieCard v-for="movie in props.movies" :key="movie.id" :movie="movie" />
        </div>
        <div v-else-if="layout === 'row'" class="movie-row">
            <MovieCard :movie="movie" v-for="movie in props.movies" :key="movie.id" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Movie } from '../models/Movie';
import MovieCard from './MovieCard.vue';

const props = defineProps<{
    movies: Movie[];
    layout: 'grid' | 'row';
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

.movie-row {
    display: flex;
    overflow-x: auto;
    gap: 16px;
    padding: 16px;
    align-items: stretch;

    .movie-card {
        flex-shrink: 0;
        width: 200px;
    }
}


@media (max-width: 768px) {
    .movie-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
}
</style>