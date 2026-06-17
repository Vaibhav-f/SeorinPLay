import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { CirclePlay } from 'lucide-react'
const apiKey = import.meta.env.VITE_TMDB_TOKEN;
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
const GenresSection = () => {
  const navigate = useNavigate()
const [data, setData] = useState([])
const getData = async()=>{
     const res = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
     console.log(res.data.results);
     setData(res.data.results)
     
}
useEffect(()=>{
  getData()
},[])
   
  return (

    <div>
     <div className='flex justify-between px-6 py-3 '>
           
            <h1 className='font-semibold text-white lg:text-2xl md:text-xl  '>Genres</h1>
            <h3 
             onClick={() => navigate('/now_playing')}
            className='text-cyan-400 font-semibold lg:hidden md:hidden'>See all</h3>
               <h3 

               onClick={() => navigate('/now_playing')}
               className='text-cyan-400 font-semibold hidden lg:block md:block rounded-full border-2 px-3 py-1 cursor-pointer '>View  all</h3>
        </div>
    <div className='lg:py-8 flex overflow-scroll gap-5 px-6 scrollbar-none  '>
      {data.map(function(elem){
        return<div className=' flex  flex-col overflow-hidden  shrink-0    w-40 md:w-48 lg:w-56 rounded-2xl group cursor-pointer '>

<img className='  w-full h-auto rounded-2xl shrink-0 object-cover   group-hover:scale-105 transition-transform  ' src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`} alt="" />

                            
 
  </div>
 

      })}

</div>

       
      
    </div>
  )
}

export default GenresSection
