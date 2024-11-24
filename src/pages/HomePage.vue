<template>
    <q-page padding>
        <FilterInput />
        <MovieList />
    </q-page>
</template>

<script lang="ts" setup>
import FilterInput from '../components/FilterInput.vue';
import MovieList from '../components/MovieList.vue';
</script>