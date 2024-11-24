<template>
    <q-page padding>
        <FilterInput />

        <!-- No Movies Found Message -->
        <div v-if="movies.length === 0" class="no-movies">
            <q-banner class="bg-grey-3 text-grey-8">
                No movies found.
            </q-banner>
        </div>

        <!-- Movie List -->
        <MovieList v-else :movies="movies" />
    </q-page>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useMovieStore } from '../store/movieStore';
import FilterInput from '../components/FilterInput.vue';
import MovieList from '../components/MovieList.vue';

const movieStore = useMovieStore();

// Compute the filtered movies from the store
const movies = computed(() => movieStore.filteredMovies);
</script>

<style scoped>
.no-movies {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    text-align: center;
    color: #666;
}
</style>