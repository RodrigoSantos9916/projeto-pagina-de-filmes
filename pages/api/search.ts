import { NextApiRequest, NextApiResponse } from 'next'
import { MovieResponse } from '@/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse<MovieResponse>) {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({ results: [] })
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(query as string)}`
  )

  const data: MovieResponse = await response.json()

  res.status(200).json(data)
}