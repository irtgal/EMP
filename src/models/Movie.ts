import { useMovieStore } from '../store/movieStore';

export interface IMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  popularity?: number;
  credits?: {
    crew: { name: string; job: string }[];
    cast: { name: string }[];
  };
  userRating?: number;
}

export interface FilterCriteria {
  genres?: string[];
  releaseYear?: number;
  searchQuery?: string;
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
  genre_ids!: number[];
  poster_path!: string | null;
  backdrop_path!: string | null;
  vote_average!: number;
  popularity?: number;
  runtime?: number;
  credits?: {
    crew: { name: string; job: string }[];
    cast: { name: string }[];
  };

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


}