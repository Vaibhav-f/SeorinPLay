import React, { useState, useRef, useEffect } from 'react'
import logosite from '../../assets/logosite.png'
import { Search, Menu, X, Film, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TMDB_KEY = import.meta.env.VITE_TMDB_TOKEN
const TMDB_IMG  = 'https://image.tmdb.org/t/p/w92'

// ── Search Dropdown ──────────────────────────────────────────
const SearchDropdown = ({ query, results, loading, onSelect }) => {
  if (!query.trim()) return null

  return (
    <div className='absolute top-full left-0 right-0 mt-2 bg-[#16162a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 z-50'>
      {loading ? (
        <div className='flex items-center justify-center gap-2 py-6'>
          <Loader2 className='size-5 text-purple-400 animate-spin' />
          <span className='text-white/40 text-sm'>Searching...</span>
        </div>
      ) : results.length > 0 ? (
        <>
          <p className='text-white/30 text-xs px-4 py-2 border-b border-white/8'>
            {results.length} results found
          </p>
          <ul className='max-h-72 overflow-y-auto'>
            {results.map(movie => (
              <li
                key={movie.id}
                onMouseDown={() => onSelect(movie)}
                className='flex items-center gap-3 px-4 py-3 hover:bg-purple-500/10 cursor-pointer transition-colors group'
              >
                {movie.poster_path ? (
                  <img
                    src={`${TMDB_IMG}${movie.poster_path}`}
                    alt={movie.title}
                    className='w-8 h-12 rounded-lg object-cover shrink-0'
                  />
                ) : (
                  <div className='size-10 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0'>
                    <Film className='size-5 text-purple-400' />
                  </div>
                )}
                <div className='min-w-0'>
                  <p className='text-white text-sm font-medium group-hover:text-purple-300 transition-colors truncate'>
                    {movie.title}
                  </p>
                  <p className='text-white/35 text-xs'>
                    {movie.release_date?.split('-')[0] || '—'}
                  </p>
                </div>
                <Search className='size-3.5 text-white/15 group-hover:text-purple-400 transition-colors ml-auto shrink-0' />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className='px-4 py-8 flex flex-col items-center gap-2 text-center'>
          <Film className='size-8 text-white/15' />
          <p className='text-white/35 text-sm'>
            No movies found for <span className='text-white/55'>"{query}"</span>
          </p>
        </div>
      )}
    </div>
  )
}

// ── Navbar ───────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen]         = useState(false)
  const [searchOpen, setSearchOpen]     = useState(false)
  const [desktopQuery, setDesktopQuery] = useState('')
  const [mobileQuery, setMobileQuery]   = useState('')
  const [desktopResults, setDesktopResults] = useState([])
  const [mobileResults, setMobileResults]   = useState([])
  const [desktopLoading, setDesktopLoading] = useState(false)
  const [mobileLoading, setMobileLoading]   = useState(false)

  const desktopRef = useRef(null)
  const mobileRef  = useRef(null)
  const navigate   = useNavigate()

  // TMDB fetch
  const fetchMovies = async (query, setResults, setLoading) => {
    if (!query.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const res  = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
      )
      const data = await res.json()
      setResults(data.results?.slice(0, 6) || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  // Debounce — desktop
  useEffect(() => {
    const t = setTimeout(() => fetchMovies(desktopQuery, setDesktopResults, setDesktopLoading), 400)
    return () => clearTimeout(t)
  }, [desktopQuery])

  // Debounce — mobile
  useEffect(() => {
    const t = setTimeout(() => fetchMovies(mobileQuery, setMobileResults, setMobileLoading), 400)
    return () => clearTimeout(t)
  }, [mobileQuery])

  // Click outside → close
  useEffect(() => {
    const handler = (e) => {
      if (desktopRef.current && !desktopRef.current.contains(e.target)) {
        setDesktopQuery(''); setDesktopResults([])
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileQuery(''); setMobileResults([])
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (movie) => {
    navigate(`/play/${movie.id}`)
    setDesktopQuery(''); setDesktopResults([])
    setMobileQuery(''); setMobileResults([])
    setSearchOpen(false)
  }

  return (
    <nav className='bg-[#0f0f1a] border-b border-white/8 fixed top-0 left-0 right-0 z-50 w-full'>

      <div className='flex items-center justify-between px-5 h-16 mx-auto'>

        {/* Logo */}
        <div className='flex items-center gap-2 shrink-0'>
          <img className='size-8 md:size-10' src={logosite} alt='Seorin Play logo' />
          <h1 className='text-purple-400 text-xl md:text-2xl lg:text-3xl font-bold leading-none'>
            Seorin <span className='text-indigo-400'>Play</span>
          </h1>
        </div>

        {/* Desktop search */}
        <div ref={desktopRef} className='hidden md:flex relative flex-1 max-w-xs lg:max-w-md mx-6'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-white/40 size-4 pointer-events-none z-10' />
          <input
            className='w-full bg-white/7 border border-white/10 rounded-full pl-9 pr-4 h-10 text-white text-sm placeholder:text-white/35 outline-none focus:border-purple-500/50 focus:bg-purple-500/8 transition-all'
            type='text'
            placeholder='Search movies...'
            value={desktopQuery}
            onChange={e => setDesktopQuery(e.target.value)}
          />
          <SearchDropdown query={desktopQuery} results={desktopResults} loading={desktopLoading} onSelect={handleSelect} />
        </div>

        {/* Desktop buttons */}
        <div className='hidden md:flex items-center gap-2 shrink-0'>
          <button onClick={() => navigate('/signin')} className='rounded-full border border-white/25 text-white text-sm font-medium px-5 h-9 hover:bg-white/5 active:scale-95 transition-all'>
            Sign in
          </button>
          <button onClick={() => navigate('/subscription')} className='rounded-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-5 h-9 active:scale-95 transition-all'>
            Subscribe now
          </button>
        </div>

        {/* Mobile icons */}
        <div className='flex md:hidden items-center gap-2'>
          <button onClick={() => setSearchOpen(s => !s)} className='size-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/12' aria-label='Search'>
            <Search className='size-4' />
          </button>
          <button onClick={() => setMenuOpen(m => !m)} className='size-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/12' aria-label='Menu'>
            {menuOpen ? <X className='size-4' /> : <Menu className='size-4' />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className='md:hidden px-5 pb-3'>
          <div ref={mobileRef} className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-white/40 size-4 pointer-events-none z-10' />
            <input
              autoFocus
              className='w-full bg-white/7 border border-white/10 rounded-full pl-9 pr-4 h-10 text-white text-sm placeholder:text-white/35 outline-none focus:border-purple-500/50 transition-all'
              type='text'
              placeholder='Search movies...'
              value={mobileQuery}
              onChange={e => setMobileQuery(e.target.value)}
            />
            <SearchDropdown query={mobileQuery} results={mobileResults} loading={mobileLoading} onSelect={handleSelect} />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className='md:hidden border-t border-white/8 px-5 py-4 flex flex-col gap-3'>
          <button onClick={() => navigate('/signin')} className='w-full rounded-full border border-white/25 text-white text-sm font-medium h-11 hover:bg-white/5 active:scale-95 transition-all'>
            Sign in
          </button>
          <button onClick={() => navigate('/subscription')} className='w-full rounded-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold h-11 active:scale-95 transition-all'>
            Subscribe now
          </button>
        </div>
      )}

    </nav>
  )
}

export default Navbar