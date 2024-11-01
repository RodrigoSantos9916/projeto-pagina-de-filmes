import Image from 'next/image'
import Link from 'next/link'
import { Movie, MovieResponse } from '@/types'

async function getPopularMovies(): Promise<MovieResponse> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=pt-BR&page=1`)
  if (!res.ok) {
    throw new Error('Falha ao buscar dados')
  }
  return res.json()
}

export default async function Home() {
  const data = await getPopularMovies()
  const movies: Movie[] = data.results

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Filmes Populares</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: Movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full h-[300px]">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sem imagem</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-600">
                Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}
              </p>
              <Link href={`/filme/${movie.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}