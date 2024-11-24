<template>
    <q-card class="movie-card" @click="goToDetails">
        <q-img :src="movie.imageUrl" :alt="movie.title" class="movie-image" ratio="16/9" />

        <q-card-section class="movie-info">
            <div class="movie-title text-h6">{{ movie.title }}</div>
            <div class="movie-details text-subtitle2">
                {{ movie.releaseYear }} &bullet; {{ movie.duration }} min
            </div>
            <div class="movie-description text-body2">
                {{ movie.description }}
            </div>
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
    max-width: 300px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
}

.movie-card:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.movie-image {
    height: 200px;
    object-fit: cover;
}

.movie-info {
    padding: 16px;
}

.movie-title {
    font-weight: bold;
    margin-bottom: 8px;
}

.movie-details {
    color: #666;
    margin-bottom: 8px;
}

.q-card-actions {
    padding: 8px 16px;
    border-top: 1px solid #eee;
}
</style>