<template>
    <q-page class="movie-details-page">
        <div v-if="movie" class="movie-details-container">
            <q-img :src="movie.imageUrl || BACKUP_IMAGE_URL" :alt="movie.title" class="movie-image" fit="contain" />
            <div class="movie-title text-h4 q-mt-md">{{ movie.title }}</div>
            <div class="movie-info text-subtitle2">
                {{ movie.releaseYear }} &bullet; {{ movie.runtime }} min
            </div>
            <div class="movie-description text-body1 q-my-md">
                {{ movie.description }}
            </div>
            <div class="movie-director text-body2 q-my-sm">
                <!-- <strong>Director:</strong> {{ movie.director }} -->
            </div>
            <div class="movie-cast text-body2 q-my-sm">
                <!-- <strong>Cast:</strong> {{ movie.cast.join(', ') }} -->
            </div>
            <div class="rating-wrapper">
                <RatingControl class="rating-control" :movie="movie" :initialRating="movie.userRating || 0" />
            </div>

            <template v-if="movie.recommendedMovies">
                <div class="text-h6 text-weight-bold q-mt-md q-mb-sm">
                    Recommended Movies
                </div>
                <movie-list :movies="movie.recommendedMovies" layout="row" />
            </template>
        </div>
        <div v-else class="no-movie-found">
            <q-banner class="bg-grey-3 text-grey-8">
                Movie not found.
            </q-banner>
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import RatingControl from '../components/RatingControl.vue';
import { Movie } from '../models/Movie';
import { useMovieStore } from 'src/store/movieStore';
import MovieList from '../components/MovieList.vue';

const movieStore = useMovieStore();

const route = useRoute();
const movieId = Number(route.params.id);

const movie = ref<Movie | null>(null);

onMounted(async () => {
    movie.value = await movieStore.fetchAndCacheMovieDetails(movieId);
});

watch(() => route.params.id, async (id) => {
    movie.value = await movieStore.fetchAndCacheMovieDetails(Number(id));
});

const BACKUP_IMAGE_URL = 'https://via.placeholder.com/300x400?text=No+Image';
</script>

<style scoped>
.movie-details-page {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #f9f9f9;
}

.movie-details-container {
    max-width: 600px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: left;
}

.movie-image {
    border-radius: 8px;
    max-height: 400px;
}

.movie-title {
    font-weight: bold;
    color: #333;
}

.movie-info {
    color: #555;
}

.movie-description {
    color: #666;
    line-height: 1.6;
}

.movie-director,
.movie-cast {
    font-size: 0.9rem;
    color: #444;
}

.rating-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.rating-control {
    font-size: 2rem;
    line-height: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.no-movie-found {
    text-align: center;
    margin-top: 40px;
}
</style>