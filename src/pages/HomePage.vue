<template>
    <q-page padding>
        <!-- Section: Upcoming Movies -->
        <section v-if="upcomingMovies.length" class="q-mb-xl">
            <h1 class="text-h5 q-mb-md">Upcoming Movies</h1>
            <MovieList :movies="upcomingMovies" layout="row" />
        </section>

        <!-- Section: Popular Movies -->
        <section v-if="popularMovies.length" class="q-mb-xl">
            <h1 class="text-h5 q-mb-md">Popular Movies</h1>
            <MovieList :movies="popularMovies" layout="row" />
        </section>

        <!-- Section: Rated Movies (from store) -->
        <section v-if="ratedMovies.length" class="q-mb-xl">
            <h1 class="text-h5 q-mb-md">Rated Movies</h1>
            <MovieList :movies="ratedMovies" layout="row" />
        </section>
    </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../store/movieStore';
import MovieList from 'src/components/MovieList.vue';
import { fetchPopularMovies, fetchUpcomingMovies } from 'src/api/movieService';
import type { Movie } from 'src/models/Movie';

// Access rated movies from the store
const { ratedMovies } = storeToRefs(useMovieStore());

// Local state for popular/upcoming movies
const popularMovies = ref<Movie[]>([]);
const upcomingMovies = ref<Movie[]>([]);
const isLoading = ref(false);


// Fetch popular movies
async function loadPopularMovies() {
    isLoading.value = true;
    try {
        const data = await fetchPopularMovies();
        popularMovies.value = data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
    } finally {
        isLoading.value = false;
    }
}

// Fetch upcoming movies
async function loadUpcomingMovies() {
    isLoading.value = true;
    try {
        const data = await fetchUpcomingMovies();
        upcomingMovies.value = data.results;
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    loadPopularMovies();
    loadUpcomingMovies();
});
</script>