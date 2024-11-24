<template>
    <div class="filter-input q-pa-md">
        <q-input v-model="searchQuery" label="Search" @input="applyFilters" clearable />

        <q-select v-model="selectedGenres" :options="genreOptions" label="Genres" multiple emit-value map-options
            @update:model-value="applyFilters" clearable />

        <q-select v-model="selectedYear" :options="yearOptions" label="Release Year" emit-value map-options
            @update:model-value="applyFilters" clearable />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useMovieStore } from '../store/movieStore';

const movieStore = useMovieStore();

const searchQuery = ref('');
const selectedGenres = ref<string[]>([]);
const selectedYear = ref<number | null>(null);

onMounted(() => {
    const criteria = movieStore.filterCriteria;
    searchQuery.value = criteria.searchQuery || '';
    selectedGenres.value = criteria.genres || [];
    selectedYear.value = criteria.releaseYear || null;
});

const genreOptions = computed(() => {
    const genres = new Set<string>();
    movieStore.movies.forEach(movie => movie.genres.forEach(genre => genres.add(genre)));
    return Array.from(genres).map(genre => ({ label: genre, value: genre }));
});

const yearOptions = computed(() => {
    const years = new Set<number>();
    movieStore.movies.forEach(movie => years.add(movie.releaseYear));
    return Array.from(years)
        .sort((a, b) => b - a)
        .map(year => ({ label: year.toString(), value: year }));
});

const applyFilters = () => {
    const criteria = {
        genres: selectedGenres.value,
        releaseYear: selectedYear.value || undefined,
        searchQuery: searchQuery.value,
    };
    movieStore.setFilterCriteria(criteria);
};

watch([selectedGenres, selectedYear, searchQuery], applyFilters);
</script>

<style scoped>
.filter-input {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>