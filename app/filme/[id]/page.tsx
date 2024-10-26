import Image from 'next/image'
import { Movie } from '@/types'

async function getMovieDetails(id: string): Promise<Movie> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`)
  if (!res.ok) {
    throw new Error('Falha ao buscar dados')
  }
  return res.json()
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="relative w-full h-[450px]">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
                <span className="text-gray-500">Sem imagem</span>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.overview}</p>
          <p className="mb-2"><strong>Data de Lançamento:</strong> {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>
          <p className="mb-2"><strong>Avaliação:</strong> {movie.vote_average.toFixed(1)} / 10</p>
          {movie.runtime && <p className="mb-2"><strong>Duração:</strong> {movie.runtime} minutos</p>}
          {movie.genres && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">Gêneros</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}