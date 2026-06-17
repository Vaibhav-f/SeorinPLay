import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const apiKey = import.meta.env.VITE_TMDB_TOKEN

const GENRES = [
  { label: 'All',       id: 'all', className: 'hidden md:block lg:block w-15' },
  { label: 'Comedy',    id: 35,    className: 'hidden md:block lg:block w-28' },
  { label: 'Action',    id: 28,    className: 'hidden md:block lg:block w-28' },
  { label: 'Horror',    id: 27,    className: 'hidden md:block lg:block w-28' },
  { label: 'Drama',     id: 18,    className: 'hidden md:block lg:block w-25' },
  { label: 'Animation', id: 16,    className: 'hidden md:hidden lg:block w-32' },
]

// movieId prop lo — jis movie ka detail page ho uska ID pass karo
const RecomededSection = ({ movieId = 123 }) => {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`
      )
      setData(res.data.results)
    } catch (err) {
      console.error('Recommendations fetch failed:', err)
    }
  }

  useEffect(() => { getData() }, [movieId])

  // movieId bhi URL mein bhejo taaki GenrePage same movie ke liye fetch kare
  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}/${movieId}`)
  }

  return (
    <div className='flex flex-col gap-3 px-6 py-4 md:mt-8 w-full'>
      <div className='flex justify-between text-white lg:text-2xl md:text-xl font-medium'>
        <h1>Recommended for you</h1>

        <div className='lg:text-xl flex lg:gap-10'>
          <h1
            className='text-cyan-400 lg:hidden md:hidden cursor-pointer'
            onClick={() => handleGenreClick('all')}
          >
            See all
          </h1>

          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`${genre.className} rounded-2xl hover:bg-sky-600 h-8 cursor-pointer 
                          active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-colors`}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      <div className='flex gap-5 overflow-x-scroll scrollbar-none'>
        {data.map((elem) => (
          <div key={elem.id} className='shrink-0 w-40 md:w-48 lg:w-56 rounded-2xl group cursor-pointer'>
            <div className='relative overflow-hidden rounded-2xl'>
              <img
                loading='lazy'
                className='w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-300'
                src={`https://image.tmdb.org/t/p/w342${elem.poster_path}`}
                alt={elem.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecomededSection