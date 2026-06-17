import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Star, ArrowLeft, Film } from 'lucide-react'

const apiKey = import.meta.env.VITE_TMDB_TOKEN

const GENRES = [
  { label: 'All', id: 'all' },
  { label: 'Comedy', id: 35 },
  { label: 'Action', id: 28 },
  { label: 'Horror', id: 27 },
  { label: 'Drama', id: 18 },
  { label: 'Animation', id: 16 },
]

const GENRE_LABEL = Object.fromEntries(GENRES.map(g => [String(g.id), g.label]))

const SkeletonCard = () => (
  <div className='animate-pulse'>
    <div className='bg-white/10 rounded-2xl aspect-[2/3] w-full' />
    <div className='mt-2 h-3 bg-white/10 rounded w-3/4' />
    <div className='mt-1 h-3 bg-white/10 rounded w-1/3' />
  </div>
)

const GenrePage = () => {
  const { genreId, movieId } = useParams()
  const navigate = useNavigate()

  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllRecommendations = useCallback(async () => {
    if (!movieId) return
    setLoading(true)
    try {
      const first = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&page=1`
      )
      const total = Math.min(first.data.total_pages, 5)
      let results = [...first.data.results]

      if (total > 1) {
        const pageRequests = Array.from({ length: total - 1 }, (_, i) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&page=${i + 2}`
          )
        )
        const responses = await Promise.all(pageRequests)
        responses.forEach(r => {
          results = [...results, ...r.data.results]
        })
      }

      setAllMovies(results)
    } catch (err) {
      console.error('fetch failed', err)
    } finally {
      setLoading(false)
    }
  }, [movieId])

  useEffect(() => {
    fetchAllRecommendations()
  }, [fetchAllRecommendations])

  useEffect(() => {
    if (genreId === 'all') {
      setFilteredMovies(allMovies)
    } else {
      setFilteredMovies(
        allMovies.filter(m => m.genre_ids && m.genre_ids.includes(Number(genreId)))
      )
    }
  }, [genreId, allMovies])

  const switchGenre = (id) => {
    navigate('/genre/' + id + '/' + movieId, { replace: true })
  }

  return (
    <div className='min-h-screen bg-[#0f0f1a] text-white px-4 md:px-8 py-6'>
      <div className='flex items-center gap-3 mb-6'>
        <button
          onClick={() => navigate(-1)}
          className='p-2 rounded-full hover:bg-white/10 transition-colors'
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className='text-xl md:text-2xl font-bold'>
          {GENRE_LABEL[String(genreId)]} Recommendations
        </h1>
        {!loading && (
          <span className='text-sm text-gray-500 ml-1'>
            ({filteredMovies.length} movies)
          </span>
        )}
      </div>

      <div className='flex gap-2 overflow-x-scroll scrollbar-none mb-6'>
        {GENRES.map((g) => (
          <button
            key={g.id}
            onClick={() => switchGenre(g.id)}
            className={
              'shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all active:scale-95 ' +
              (String(genreId) === String(g.id)
                ? 'bg-sky-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20')
            }
          >
            {g.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {Array.from({ length: 15 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-24 gap-4 text-gray-500'>
          <Film size={48} strokeWidth={1} />
          <p className='text-lg'>No {GENRE_LABEL[String(genreId)]} movies found</p>
          <button onClick={() => switchGenre('all')} className='text-sky-400 text-sm hover:underline'>
            Show all recommendations
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {filteredMovies.map((movie) => (
            <div key={movie.id} className='group cursor-pointer'>
              <div className='relative overflow-hidden rounded-2xl'>
                <img
                  loading='lazy'
                  className='w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-300'
                  src={
                    movie.poster_path
                      ? 'https://image.tmdb.org/t/p/w342' + movie.poster_path
                      : 'https://via.placeholder.com/342x513?text=No+Image'
                  }
                  alt={movie.title}
                />
              </div>
              <div className='mt-2 px-1'>
                <p className='text-sm font-medium truncate'>{movie.title}</p>
                <div className='flex items-center gap-1 mt-1'>
                  <Star size={11} className='text-yellow-400 fill-yellow-400 shrink-0' />
                  <span className='text-xs text-gray-400'>
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                  <span className='text-xs text-gray-600 ml-1'>
                    {movie.release_date ? movie.release_date.slice(0, 4) : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GenrePage