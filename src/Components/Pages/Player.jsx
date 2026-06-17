import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Clock, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

const KEY = import.meta.env.VITE_TMDB_API_KEY

// Free public domain movies (demo ke liye)
const DEMO_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
]

const Player = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  // Movie ID se demo video pick karo
  const videoUrl = DEMO_VIDEOS[id % DEMO_VIDEOS.length]

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`)
      .then(r => r.json())
      .then(setMovie)
  }, [id])

  const togglePlay = () => {
    if (videoRef.current) {
      playing ? videoRef.current.pause() : videoRef.current.play()
      setPlaying(!playing)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const handleProgress = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(p || 0)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    if (videoRef.current) {
      videoRef.current.currentTime = x * videoRef.current.duration
    }
  }

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen?.()
  }

  return (
    <div className='min-h-screen bg-[#0f0f1a] pt-16'>

      {/* Back */}
      <div className='px-5 py-3'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors'
        >
          <ArrowLeft className='size-4' /> Back
        </button>
      </div>

      {/* Video Player */}
      <div className='w-full max-w-5xl mx-auto px-4'>
        <div className='relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/8 group'>

          {/* Video */}
          <video
            ref={videoRef}
            src={videoUrl}
            className='absolute inset-0 w-full h-full object-contain'
            onTimeUpdate={handleProgress}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            poster={movie?.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
              : undefined
            }
          />

          {/* Controls overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 gap-3'>

            {/* Progress bar */}
            <div
              className='w-full h-1 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all'
              onClick={handleSeek}
            >
              <div
                className='h-full bg-purple-500 rounded-full relative'
                style={{ width: `${progress}%` }}
              >
                <div className='absolute right-0 top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow' />
              </div>
            </div>

            {/* Buttons */}
            <div className='flex items-center gap-3'>
              <button
                onClick={togglePlay}
                className='size-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all'
              >
                {playing
                  ? <Pause className='size-4 text-white fill-white' />
                  : <Play className='size-4 text-white fill-white ml-0.5' />
                }
              </button>

              <button
                onClick={toggleMute}
                className='size-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all'
              >
                {muted
                  ? <VolumeX className='size-4 text-white' />
                  : <Volume2 className='size-4 text-white' />
                }
              </button>

              <span className='text-white/50 text-xs ml-auto'>
                {movie?.title}
              </span>

              <button
                onClick={handleFullscreen}
                className='size-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all'
              >
                <Maximize className='size-4 text-white' />
              </button>
            </div>
          </div>

          {/* Center play button */}
          {!playing && (
            <button
              onClick={togglePlay}
              className='absolute inset-0 flex items-center justify-center'
            >
              <div className='size-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all'>
                <Play className='size-7 text-white fill-white ml-1' />
              </div>
            </button>
          )}

        </div>
      </div>

      {/* Movie Info */}
      {movie && (
        <div className='max-w-5xl mx-auto px-4 py-6 flex gap-5'>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
              className='hidden sm:block w-28 rounded-xl object-cover shrink-0 border border-white/8'
            />
          )}
          <div>
            <h1 className='text-white text-2xl font-bold'>{movie.title}</h1>
            <div className='flex flex-wrap items-center gap-4 mt-2 text-white/45 text-sm'>
              <span className='flex items-center gap-1'>
                <Star className='size-3.5 text-yellow-400 fill-yellow-400' />
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className='flex items-center gap-1'>
                <Clock className='size-3.5' />
                {movie.runtime} min
              </span>
              <span>{movie.release_date?.split('-')[0]}</span>
            </div>
            <div className='flex flex-wrap gap-2 mt-3'>
              {movie.genres?.map(g => (
                <span key={g.id} className='text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20'>
                  {g.name}
                </span>
              ))}
            </div>
            <p className='text-white/55 text-sm leading-relaxed mt-4'>{movie.overview}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Player