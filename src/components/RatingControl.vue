<template>
    <q-rating v-model="rating" color="amber" @update:model-value="onRate" max="5" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useMovieStore } from '../store/movieStore';

const props = defineProps<{ movieId: number; initialRating: number }>();
const rating = ref(props.initialRating);

const movieStore = useMovieStore();

const onRate = (value: number) => {
    movieStore.rateMovie(props.movieId, value);
};

watch(
    () => props.initialRating,
    (newVal) => {
        rating.value = newVal;
    }
);

console.log(props)
</script>