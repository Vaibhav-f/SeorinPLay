import React from 'react'
import popi from '../../assets/popi.png'
import { useNavigate } from 'react-router-dom'
const SubscribeSection = () => {
    const navigate = useNavigate()
  return (
    <div className='px-4 md:px-6  py-6'>
      <div className='w-full rounded-2xl bg-linear-to-br from-blue-700 via-indigo-900 to-purple-950 flex flex-col md:flex-row items-center overflow-hidden h-56 md:h-72 lg:h-80'>

        {/* Image */}
        <div className='hidden md:block  md:w-64 lg:w-80 shrink-0 h-full'>
          <img
            className='h-full w-full object-cover'
            src={popi}
            alt="Subscribe banner"
          />
        </div>

        {/* Text Content */}
        <div className='flex flex-col gap-4 px-6 py-8 md:py-10 lg:px-14 flex-1'>
          <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
            Unlimited movies, TV shows & more
          </h1>
          <p className='text-gray-300 text-base md:text-lg lg:text-xl font-normal'>
            Watch anywhere. Cancel anytime.
          </p>
          <button 
          onClick={() => navigate('/subscription')}
          className='self-start rounded-full bg-sky-600 hover:bg-sky-700 active:scale-95 transition-all text-white font-semibold text-base md:text-lg px-8 h-11 cursor-pointer'>
            Subscribe now
          </button>
        </div>

      </div>
    </div>
  )
}

export default SubscribeSection