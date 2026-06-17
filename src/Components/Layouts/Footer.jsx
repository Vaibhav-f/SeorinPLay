import React from 'react'
import logosite from '../../assets/logosite.png'
import { Send } from 'lucide-react'
import { Link } from 'react-router-dom'

const FooterPage = () => {
  return (
    <footer className='bg-[#0a0f1e] border-t border-white/10 px-4 md:px-8 lg:px-12 py-10 mb-12 md:mb-0'>

      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

        {/* Brand */}
        <div className='flex flex-col gap-3'>
          <Link to='/' className='flex items-center gap-2 w-fit'>
            <img className='size-9 lg:size-12' src={logosite} alt="Seorin Play logo" />
            <h2 className='text-purple-400 text-2xl lg:text-3xl font-bold'>
              Seorin <span className='text-indigo-400'>Play</span>
            </h2>
          </Link>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Your ultimate destination for entertainment.
          </p>
          <p className='text-gray-500 text-xs'>
            © 2024 Seorin Play. All rights reserved.
          </p>
        </div>

        {/* Explore */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-white text-lg font-semibold mb-1'>Explore</h3>
          {[
            { label: 'Home',      path: '/' },
            { label: 'Movies',    path: '/movies' },
            { label: 'TV Shows',  path: '/tv-shows' },
            { label: 'Trending',  path: '/trending' },
            { label: 'Top Rated', path: '/top-rated' },
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className='text-gray-400 hover:text-white text-sm transition-colors'
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-white text-lg font-semibold mb-1'>Quick Links</h3>
          {[
            { label: 'About Us',         path: '/about' },
            { label: 'Privacy Policy',   path: '/privacy-policy' },
            { label: 'Terms of Service', path: '/terms' },
            { label: 'Help Center',      path: '/help' },
            { label: 'Contact',          path: '/contact' },
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className='text-gray-400 hover:text-white text-sm transition-colors'
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Subscribe */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-white text-lg font-semibold'>Subscribe</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Get the latest updates and exclusive offers.
          </p>
          <div className='flex items-center bg-white/8 border border-white/10 rounded-full overflow-hidden pr-1'>
            <input
              className='flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/35 outline-none'
              type="email"
              placeholder='Enter your email'
            />
            <button className='bg-cyan-500 hover:bg-cyan-600 active:scale-95 transition-all rounded-full p-2 cursor-pointer shrink-0'>
              <Send className='size-4 text-white' />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterPage