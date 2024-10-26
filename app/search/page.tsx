'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '@/types'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])

  const searchMovies = async () => {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
    const data = await res.json()
    setResults(data.results)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Buscar Filmes</h1>
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Digite o nome do filme..."
        />
        <button
          onClick={searchMovies}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((movie) => (
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
    </div>
  )
}