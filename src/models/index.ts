export interface Movie {
    id: number;
    title: string;
    description: string;
    releaseYear: number;
    genres: string[]; 
    director: string;
    cast: string[]; 
    imageUrl: string; 
    duration: number; 
    rating: number; 
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