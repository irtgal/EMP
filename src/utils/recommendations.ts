import { Movie } from '../models/Movie';

  const ratingWeights: Record<number, number> = {
    3: 1, 
    4: 2,
    5: 3,
  };
  
  export function computeGenrePreference(ratedMovies: Movie[]): Record<number, number> {
    const preference: Record<number, number> = {};
  
    for (const movie of ratedMovies) {
      const userRating = movie.userRating;
      if (!userRating || userRating < 3) {
        // skip movies rated < 3 or not rated
        continue;
      }
  
      const weight = ratingWeights[userRating] || 0;
      for (const genreId of movie.genreIds) {
        preference[genreId] = (preference[genreId] || 0) + weight;
      }
    }
  
    return preference;
  }
  
  export function makeRatedMovieSet(ratedMovies: Movie[]): Set<number> {
    return new Set(ratedMovies.map(m => m.id));
  }
  
  
  export function recommendMovies(ratedMovies: Movie[]): Movie[] {
    console.log('Calculating recommendations...');
    
    const genrePreference = computeGenrePreference(ratedMovies);
    const ratedMovieIds = makeRatedMovieSet(ratedMovies);

    const recommendationScores = new Map<number, { movie: Movie; score: number }>();

  
    for (const parentMovie of ratedMovies) {
      const userRating = parentMovie.userRating;
      if (!userRating || userRating < 3) continue;
  
      // rating weight of the parent movie
      const parentWeight = ratingWeights[userRating] || 0;
  
      // skip if no recommended movies
      if (!parentMovie.recommendedMovies) continue;
  
      for (const recMovie of parentMovie.recommendedMovies) {
        // skip if user already rated this recommendation
        if (ratedMovieIds.has(recMovie.id)) {
          continue;
        }
  
        let scoreFromGenres = 0;
        for (const genreId of recMovie.genreIds) {
          scoreFromGenres += (genrePreference[genreId] || 0);
        }
  
        const recScore = parentWeight + scoreFromGenres;
  
        // add or update in the map
        if (!recommendationScores.has(recMovie.id)) {
          recommendationScores.set(recMovie.id, {
            movie: new Movie(recMovie),
            score: recScore,
          });
        } else {
          // if we've already got this movie, add more to its score
          const existingEntry = recommendationScores.get(recMovie.id)!;
          existingEntry.score += recScore;
        }
      }
    }
  
    // convert Map to array, sort by score descending
    const sortedRecommendations = Array.from(recommendationScores.values())
      .sort((a, b) => b.score - a.score)
      .map(item => item.movie);
  
    return sortedRecommendations.slice(0, 20);
  }