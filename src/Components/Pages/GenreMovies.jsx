import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const apiKey = import.meta.env.VITE_TMDB_TOKEN

const GenreMovies = () => {
  const { genreId, genreName } = useParams()
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/now_playing/movie?api_key=${apiKey}&with_genres=${genreId}`
      )
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
  }, [genreId])

  return (
    <div className="bg-[#0f0f1a] min-h-screen text-white pt-24 px-5">
      <h1 className="text-3xl font-bold mb-8">
        {decodeURIComponent(genreName)} Movies
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              className="rounded-xl w-full"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <h2 className="mt-2 text-sm font-semibold">
              {movie.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GenreMovies