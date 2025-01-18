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
import { onMounted, onBeforeUnmount, watch, ref } from 'vue';
import { debounce } from 'lodash';
import MovieList from '../components/MovieList.vue';
import { searchMovies } from 'src/api/movieService';
import { SessionStorage } from 'quasar';

const searchQuery = ref<string>(SessionStorage.getItem('searchQuery') as string || '');
const currentPage = ref<number>(Number(SessionStorage.getItem('currentPage')) || 1);
const totalPages = ref(1);
const isLoading = ref(false);
const movies = ref([]);

const debouncedGetSearchMovies = debounce(() => {
    onSearchMovies();
}, 500);

watch(searchQuery, () => {
    currentPage.value = 1;
    debouncedGetSearchMovies();
});

const onSearchMovies = async () => {
    isLoading.value = true;
    try {
        const data = await searchMovies(searchQuery.value as string, currentPage.value);
        movies.value = data.results;
        totalPages.value = data.total_pages;
    } catch (error) {
        console.error('Error searching movies:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {

    if (searchQuery.value) {
        onSearchMovies();
    }
});

onBeforeUnmount(() => {
    storeSearchState();
});

function handlePageChange(page: number) {
    currentPage.value = page;
    onSearchMovies();
}

function storeSearchState() {
    if (!searchQuery.value || searchQuery.value.trim() === '') {
        SessionStorage.remove('searchQuery');
        SessionStorage.remove('currentPage');
        return;
    }
    SessionStorage.set('searchQuery', searchQuery.value);
    SessionStorage.set('currentPage', currentPage.value);
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