import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, Play, Star, Clock, Calendar, X } from 'lucide-react'

const apiKey = import.meta.env.VITE_TMDB_TOKEN

const Moviedetailpage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchAll = async () => {
      setLoading(true)
      try {
        const [movieRes, videosRes, creditsRes] = await Promise.all([
          axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey),
          axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + apiKey),
          axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + apiKey),
        ])

        setMovie(movieRes.data)
        setCast(creditsRes.data.cast.slice(0, 12))

        const found = videosRes.data.results.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        setTrailer(found || null)
      } catch (err) {
        console.error('fetch failed', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!movie) return null

  const hours = Math.floor(movie.runtime / 60)
  const mins = movie.runtime % 60

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white pb-16">

      {/* Backdrop */}
      <div className="relative h-[45vh] md:h-[65vh] w-full">
        <img
          src={'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f0f1a] via-[#0f0f1a]/40 to-black/20" />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 md:left-8 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
      </div>

      {/* Main content */}
      <div className="px-4 md:px-10 -mt-28 md:-mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">

          {/* Poster */}
          <div className="shrink-0 w-28 md:w-44 lg:w-52 mx-auto md:mx-0 shadow-2xl">
            <img
              src={'https://image.tmdb.org/t/p/w342' + movie.poster_path}
              alt={movie.title}
              className="w-full rounded-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1 md:pt-24">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              {movie.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{hours}h {mins}m</span>
                </div>
              )}
              {movie.release_date && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{movie.release_date.slice(0, 4)}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres && movie.genres.map(g => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
              {movie.overview}
            </p>

            {/* Play button */}
            <button
              onClick={() => {
                if (trailer) {
                  setShowPlayer(true)
                } else {
                  alert('Trailer available nahi hai is movie ka')
                }
              }}
              className="flex items-center gap-3 bg-sky-600 hover:bg-sky-500 active:scale-95 
                         px-7 py-3 rounded-full font-semibold transition-all duration-200
                         shadow-[0_0_24px_rgba(59,130,246,0.5)]"
            >
              <Play size={20} fill="white" strokeWidth={0} />
              Play Trailer
            </button>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-scroll scrollbar-none pb-2">
              {cast.map(person => (
                <div key={person.id} className="shrink-0 text-center w-20">
                  <img
                    loading="lazy"
                    src={
                      person.profile_path
                        ? 'https://image.tmdb.org/t/p/w185' + person.profile_path
                        : 'https://via.placeholder.com/185x278?text=?'
                    }
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-1 border-2 border-white/10"
                  />
                  <p className="text-xs text-gray-300 truncate">{person.name}</p>
                  <p className="text-xs text-gray-500 truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showPlayer && trailer && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPlayer(false)}
        >
          <div
            className="w-full max-w-4xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowPlayer(false)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                src={'https://www.youtube.com/embed/' + trailer.key + '?autoplay=1'}
                title="Trailer"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Moviedetailpage