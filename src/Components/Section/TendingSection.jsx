import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import axios from 'axios'
import { CirclePlay } from 'lucide-react'
const apiKey = import.meta.env.VITE_TMDB_TOKEN;
import { useNavigate } from 'react-router-dom'
const TendingSection = () => {

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const getData = async ()=>{
    const response =await axios .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
      
   );
    
    console.log(response.data.results,'hlo');
    
    setData(response.data.results)



  }
  useEffect(()=>{
  getData()
},[])
  return (



    <div className='lg:py-8 '>

        <div className='flex justify-between px-6 py-3 '>
            <h1 className='font-semibold text-white lg:hidden md:hidden  '>Trending</h1>
            <h1 className='font-semibold text-white lg:text-2xl md:text-xl hidden md:block lg:block  '>Trending Movies</h1>
            <h3 
             onClick={() => navigate('/trending')}
            className='text-cyan-400 font-semibold lg:hidden md:hidden cursor-pointer'>See all</h3>
               <h3  
                onClick={() => navigate('/trending')}
               className='text-cyan-400 font-semibold hidden lg:block md:block rounded-full border-2 px-3 py-1 cursor-pointer '>View  all</h3>
        </div>
                
                 
        <div 
       
       className='flex gap-5 overflow-scroll scrollbar-none px-6 '>
          {data.map(function(elem){
            return <div className=' shrink-0   w-40 md:w-48 lg:w-56 rounded-2xl group cursor-pointer '>
              
                   <img className='h-auto w-full rounded-2xl group-hover:scale-105 transition-transform' src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`} alt="" />
             
             </div> 
            
          
          })}
        </div>
       


          
            </div>
             
         
      
  
  )
}

export default TendingSection
