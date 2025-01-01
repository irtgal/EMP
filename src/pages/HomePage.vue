<template>
    <q-page padding>
        <!-- Section: New Movies -->
        <section v-if="newMovies.length" class="q-mb-xl">
            <h1 class="text-h5 q-mb-md">New Movies</h1>
            <MovieList :movies="newMovies" layout="row" />
        </section>

        <!-- Section: Recommended Movies -->
        <section v-if="recommendedMovies.length" class="q-mb-xl">
            <h1 class="text-h5 q-mb-md">Recommended Movies</h1>
            <MovieList :movies="recommendedMovies" layout="row" />
        </section>

        <!-- Section: Rated Movies -->
        <section v-if="ratedMovies.length" class="q-mb-xl">
            <h1 class="text-h5 q-mb-md">Rated Movies</h1>
            <MovieList :movies="ratedMovies" layout="row" />
        </section>
    </q-page>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useMovieStore } from '../store/movieStore';
import MovieList from 'src/components/MovieList.vue';

const movieStore = useMovieStore();

const newMovies = computed(() =>
    movieStore.movies.filter((movie) => {
        const currentYear = new Date().getFullYear();
        return movie.releaseYear >= currentYear - 1; // Movies from the last year
    })
);

const recommendedMovies = computed(() =>
    movieStore.movies
);

const ratedMovies = computed(() =>
    movieStore.movies.filter((movie) => movie.userRating != undefined)
);
</script>

<style scoped>
section {
    margin-bottom: 32px;
}

h2 {
    margin-bottom: 16px;
}
</style>