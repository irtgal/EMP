<template>
    <q-page padding>
        <div v-if="movie">
            <q-img :src="movie.imageUrl" :alt="movie.title" ratio="16/9" />
            <div class="text-h4 q-mt-md">{{ movie.title }}</div>
            <div class="text-subtitle2">{{ movie.releaseYear }} &bullet; {{ movie.duration }} min</div>
            <div class="text-body1 q-my-md">{{ movie.description }}</div>
            <div class="q-my-sm">
                <strong>Director:</strong> {{ movie.director }}
            </div>
            <div class="q-my-sm">
                <strong>Cast:</strong> {{ movie.cast.join(', ') }}
            </div>
            <RatingControl :movieId="movie.id" :initialRating="movie.userRating || 0" />
        </div>
        <div v-else>
            <q-banner class="bg-grey-3 text-grey-8">
                Movie not found.
            </q-banner>
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '../store/movieStore';
import RatingControl from '../components/RatingControl.vue';

const route = useRoute();
const movieStore = useMovieStore();

const movieId = Number(route.params.id);

const movie = computed(() => movieStore.movies.find(m => m.id === movieId));
</script>