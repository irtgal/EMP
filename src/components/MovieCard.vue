<template>
    <q-card class="movie-card">
        <q-img :src="movie.imageUrl" :alt="movie.title" ratio="16/9" />
        <q-card-section>
            <div class="text-h6">{{ movie.title }}</div>
            <div class="text-subtitle2">{{ movie.releaseYear }} &bullet; {{ movie.duration }} min</div>
            <div class="text-body2">{{ movie.description }}</div>
        </q-card-section>
        <q-card-actions align="right">
            <RatingControl :movieId="movie.id" :initialRating="movie.userRating || 0" />
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Movie } from '../models';
import RatingControl from './RatingControl.vue';

const props = defineProps<{ movie: Movie }>();

console.log(props)
</script>

<style scoped>
.movie-card {
    max-width: 400px;
}
</style>