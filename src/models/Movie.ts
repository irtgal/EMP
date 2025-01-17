import { useMovieStore } from '../store/movieStore';
import { fetchRecommendedMovies } from '../api/movieService';

export interface IMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  popularity?: number;
  credits?: {
    crew: { name: string; job: string }[];
    cast: { name: string }[];
  };
  genres?: Genre[]; // Fetched movies have genres, related movies have genre_ids -> specific to TMDb API
  genre_ids?: number[];
  genreIds: number[];
  userRating?: number;
  recommendedMovies?: IMovie[];
}

export interface UserRating {
  movieId: number;
  rating: number;
}

export interface Genre {
  id: number;
  name: string;
}

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const DEFAULT_POSTER_SIZE = 'w500'; // Standard size for larger images
const DEFAULT_THUMBNAIL_SIZE = 'w185'; // Standard size for thumbnails
const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/300x400?text=No+Image';

export class Movie implements IMovie {
  id!: number;
  title!: string;
  overview!: string;
  release_date!: string;
  poster_path!: string | null;
  backdrop_path!: string | null;
  vote_average!: number;
  popularity?: number;
  runtime?: number;
  genres!: Genre[];
  genre_ids?: number[];
  credits?: {
    crew: { name: string; job: string }[];
    cast: { name: string }[];
  };
  recommendedMovies?: Movie[];

  constructor(data: IMovie) {
    Object.assign(this, data);
  }

  get imageUrl(): string {
    return this.poster_path
      ? `${BASE_IMAGE_URL}${DEFAULT_POSTER_SIZE}${this.poster_path}`
      : FALLBACK_IMAGE_URL;
  }

  get thumbnailUrl(): string {
    return this.poster_path
      ? `${BASE_IMAGE_URL}${DEFAULT_THUMBNAIL_SIZE}${this.poster_path}`
      : FALLBACK_IMAGE_URL;
  }

  get releaseYear(): number {
    const year = this.release_date.split('-')[0];
    return Number(year);
  }

  get description(): string {
    return this.overview;
  }

  get userRating(): number | undefined {
    const movieStore = useMovieStore();
    return movieStore.getMovieRating(this.id) || undefined;

  }

  get genreIds(): number[] {
    return this.genre_ids || this.genres.map(g => g.id);
  }

  // Functions

  public async fetchRecommendations(): Promise<void> {
    if (this.recommendedMovies) return;
    try {
      const recommended = await fetchRecommendedMovies(this.id);
      this.recommendedMovies = recommended;
    } catch (error) {
      console.error('Error fetching recommended movies:', error);
    }
  }


}