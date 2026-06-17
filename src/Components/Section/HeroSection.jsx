import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const apiKey = import.meta.env.VITE_TMDB_TOKEN

const HeroSection = () => {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
      )
      setData(res.data.results)
    }
    getData()
  }, [])

  useEffect(() => {
    if (data.length === 0) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % data.length)
    }, 3000)
    return () => clearInterval(timerRef.current)
  }, [data])

  if (data.length === 0) return null

  return (
    <div className="relative w-full px-4 md:px-6 pt-20">
      <div className="relative rounded-2xl overflow-hidden h-55 md:h-105 lg:h-145">
        {data.map((elem, index) => (
          <div
            key={elem.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w1280${elem.backdrop_path}`}
              alt={elem.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            {/* Clickable text area — movie detail page pe le jaata hai */}
            <div
              onClick={() => navigate('/movie/' + elem.id)}
              className="absolute bottom-6 left-4 lg:bottom-12 lg:left-10 text-white z-10 max-w-2xl cursor-pointer group"
            >
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 drop-shadow-lg group-hover:text-sky-300 transition-colors duration-200">
                {elem.title}
              </h1>
              <p className="hidden md:block text-sm md:text-base lg:text-lg text-gray-200 line-clamp-3">
                {elem.overview}
              </p>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index)
                clearInterval(timerRef.current)
              }}
              className={`rounded-full transition-all duration-300 ${
                index === current ? 'bg-white w-6 h-2' : 'bg-white/40 w-2 h-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSection