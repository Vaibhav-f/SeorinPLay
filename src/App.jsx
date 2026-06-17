import React from 'react'
import HeroSection from './Components/Section/HeroSection'
import RecomededSection from './Components/Section/RecomededSection'
import TendingSection from './Components/Section/TendingSection'
import GenresSection from './Components/Section/GenresSection'
import SubscribeSection from './Components/Section/SubscribeSection'
import MobileMenu from './Components/Layouts/MobileMenu'
import Footer from './Components/Layouts/Footer'
import Navbar from './Components/Layouts/Navbar'
import { Routes, Route } from 'react-router-dom'
import SignIn from './Components/Pages/SignIn'
import GenrePage from './Components/Pages/GenrePage' 
import MovieDetailPage from './Components/Pages/MovieDetailPage' 
import Subscription from './Components/Pages/Subscription'
import TrendingMovies from './Components/Pages/TrendingMovies'
import Player from './Components/Pages/Player'
import About from './Components/Pages/About'
import ContactPage from './Components/Pages/ContactPage'
import TermsPage from './Components/Pages/TermsPage'
import HelpCenterPage from './Components/Pages/HeplCenterPage'
import PrivacyPolicyPage from './Components/Pages/PrivacyPolicyPage'

const Home = () => (
  <div className='bg-slate-900 min-h-screen w-full'>
    <Navbar />
    <HeroSection />
    <RecomededSection />
    <TendingSection />
    <GenresSection />
    <SubscribeSection />
    <MobileMenu />
    <Footer />
  </div>
)

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/genre/:genreId/:movieId' element={<GenrePage />} />
       <Route path='/movie/:id' element={<MovieDetailPage />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/trending" element={<TrendingMovies />}/>
      
 
  <Route path='/play/:id' element={<Player />} />
<Route path='/about' element={<About/>} />
<Route path='/contact'element={<ContactPage/>}/>
<Route path='/help'element={<HelpCenterPage/>} />
<Route path='/terms'element={<TermsPage/>}/>
<Route path='/privacy-policy'element={<PrivacyPolicyPage/>}/>
    </Routes>
  )
}

export default App