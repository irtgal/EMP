<template>
    <q-page padding>
        <!-- Search Input -->
        <q-input v-model="searchQuery" label="Search" clearable />

        <div v-if="isLoading" class="loading">
            <q-spinner size="50px" />
        </div>

        <!-- No Movies Found Message -->
        <div v-else-if="!searchQuery" class="no-movies">
            <q-banner class="text-blue-5">
                Find a movie by searching.
            </q-banner>
        </div>

        <div v-else-if="!isLoading && movies.length === 0" class="no-movies">
            <q-banner class="bg-grey-3 text-grey-8">
                No movies found.
            </q-banner>
        </div>

        <!-- Movie List -->
        <div v-else-if="!isLoading">
            <MovieList :movies="movies" layout="grid" />
        </div>

        <!-- Pagination -->
        <div v-if="!isLoading && totalPages > 1" class="pagination-wrapper">
            <q-pagination v-model="currentPage" :max="totalPages" @update:model-value="handlePageChange"
                :direction-links="true" :max-pages="1" :boundary-numbers="false" :boundary-links="false" input
                size="30px" />
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { debounce } from 'lodash';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../store/movieStore';
import MovieList from '../components/MovieList.vue';

const movieStore = useMovieStore();

const {
    movies,
    searchQuery,
    currentPage,
    totalPages,
    isLoading,
} = storeToRefs(movieStore);

const debouncedGetSearchMovies = debounce(() => {
    movieStore.getSearchMovies();
}, 500);

watch(searchQuery, () => {
    movieStore.resetPagination();
    debouncedGetSearchMovies();
});

onMounted(() => {
    if (!!searchQuery.value)
        movieStore.getSearchMovies();
});

function handlePageChange(page: number) {
    currentPage.value = page;
    movieStore.getSearchMovies();
}
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