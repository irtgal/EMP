<template>
    <q-card class="movie-card" @click="goToDetails">
        <q-img :src="movie.imageUrl" :alt="movie.title" class="movie-image" ratio="16/9" />

        <q-card-section class="movie-info">
            <div class="movie-title text-h6">{{ movie.title }}</div>
            <div class="movie-footer">
                <span class="movie-year">{{ movie.releaseYear }}</span>
                <RatingControl :movieId="movie.id" :initialRating="movie.userRating || 0" />
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Movie } from '../models';
import RatingControl from './RatingControl.vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ movie: Movie }>();
const router = useRouter();

const goToDetails = () => {
    router.push({ name: 'MovieDetails', params: { id: props.movie.id.toString() } });
};
</script>

<style scoped>
.movie-card {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.movie-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.movie-image {
    height: 100px;
    object-fit: cover;
}

.movie-info {
    padding: 8px;
}

.movie-title {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 4px;
}

.movie-footer {
    display: flex;
    justify-content: space-between;
    align-items: align-end;
    font-size: 12px;
    color: #666;
}

.movie-year {
    font-size: 12px;
    color: #666;
}
</style>