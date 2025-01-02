<template>
    <q-page padding>
        <!-- Search Input -->
        <q-input v-model="searchQuery" label="Search" clearable />

        <!-- No Movies Found Message -->
        <div v-if="!isLoading && movies.length === 0" class="no-movies">
            <q-banner class="bg-grey-3 text-grey-8">
                No movies found.
            </q-banner>
        </div>

        <!-- Movie List -->
        <div v-else-if="!isLoading">
            <MovieList :movies="movies" layout="grid" />
        </div>

        <!-- Loading Spinner -->
        <div v-if="isLoading" class="loading">
            <q-spinner size="50px" />
        </div>

        <!-- Pagination -->
        <div v-if="!isLoading && totalPages > 1" class="pagination-wrapper">
            <q-pagination v-model="currentPage" :max="totalPages" @update:model-value="fetchMovies"
                :direction-links="true" :max-pages="1" :boundary-numbers="false" :boundary-links="false" input
                size="30px" />
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { searchMovies, fetchPopularMovies } from 'src/api/movieService';
import MovieList from '../components/MovieList.vue';
import { debounce } from 'lodash';


const movies = ref([]);
const currentPage = ref(1);
const searchQuery = ref('');
const totalPages = ref(1);
const isLoading = ref(false);

onMounted(() => {
    fetchMovies();
});



const fetchMovies = async () => {
    isLoading.value = true;
    try {
        let data;
        if (searchQuery.value.trim() === '') {
            data = await fetchPopularMovies(currentPage.value);
        } else {
            data = await searchMovies(searchQuery.value, currentPage.value);
        }
        movies.value = data.results;
        totalPages.value = data.total_pages;
    } catch (error) {
        console.error('Error fetching movies:', error);
    } finally {
        isLoading.value = false;
    }
};
const debouncedFetchMovies = debounce(fetchMovies, 500);


watch(searchQuery, () => {
    currentPage.value = 1;
    console.log("CHANGEDD");
    debouncedFetchMovies();
});
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

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
}

.pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>