import React from 'react'
import { House, TvMinimalPlay, TrendingUpDown, UserPen, Brackets } from 'lucide-react'

const navItems = [
  { icon: House, label: 'Home' },
  { icon: TrendingUpDown, label: 'Trending' },
  { icon: Brackets, label: 'My List' },
  { icon: TvMinimalPlay, label: 'Movies' },
  { icon: UserPen, label: 'Profile' },
]

const MobileMenu = () => {
  return (
    <div className='lg:hidden md:hidden fixed bottom-0 left-0 right-0 z-50'>
      <div className='flex items-center justify-around px-2 py-3 bg-[#102146]/90 backdrop-blur-md border-t border-white/10'>
        {navItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className='flex flex-col items-center gap-1 text-white/70 hover:text-white active:scale-95 transition-all flex-1'
          >
            <Icon size={22} />
            <span className='text-[11px] font-medium'>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileMenu