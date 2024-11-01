export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    overview: string;
    vote_average: number;
  }
  
  export interface MovieResponse {
    results: Movie[];
  }