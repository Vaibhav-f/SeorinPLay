import React from 'react'
import { Film, Users, Globe, Award, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { icon: Film,  label: '10K+ Titles',   desc: 'Movies & Shows' },
  { icon: Users, label: '5M+ Viewers',   desc: 'Worldwide' },
  { icon: Globe, label: '50+ Countries', desc: 'Available In' },
  { icon: Award, label: '100+ Awards',   desc: 'Recognized Globally' },
]

const team = [
  { name: 'Alex Chen',    role: 'CEO & Founder' },
  { name: 'Priya Sharma', role: 'Head of Content' },
  { name: 'Marcus Reid',  role: 'Chief Technology Officer' },
  { name: 'Sofia López',  role: 'Head of Design' },
]

const About = () => {
  return (
    <div className='min-h-screen bg-[#0a0f1e] text-white'>

      {/* Hero */}
      <div className='bg-linear-to-b from-purple-900/30 to-transparent px-4 md:px-8 lg:px-12 pt-24 pb-16 text-center'>
        <p className='text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3'>About Us</p>
        <h1 className='text-4xl md:text-6xl font-bold mb-5'>
          Redefining <span className='text-purple-400'>Entertainment</span>
        </h1>
        <p className='text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed'>
          Seorin Play was built for movie lovers, by movie lovers. We bring you the best of cinema, TV, and original content — all in one place.
        </p>
      </div>

      <div className='max-w-6xl mx-auto px-4 md:px-8 pb-20'>

        {/* Mission + Stats */}
        <div className='grid md:grid-cols-2 gap-10 items-center mb-20'>
          <div>
            <p className='text-cyan-400 text-xs uppercase tracking-wider mb-2'>Our Mission</p>
            <h2 className='text-3xl font-bold mb-4'>Entertainment Without Boundaries</h2>
            <p className='text-gray-400 leading-relaxed mb-4'>
              We believe great stories deserve a great stage. Seorin Play connects audiences with movies and TV shows from around the world — making world-class entertainment accessible to everyone.
            </p>
            <p className='text-gray-400 leading-relaxed'>
              From blockbuster hits to indie gems, from gripping dramas to laugh-out-loud comedies — we curate content that resonates.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {stats.map(({ icon: Icon, label, desc }) => (
              <div key={label} className='bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/40 transition-colors'>
                <Icon className='size-6 text-purple-400 mx-auto mb-3' />
                <p className='text-white font-bold text-xl'>{label}</p>
                <p className='text-gray-500 text-xs mt-1'>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className='bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-20'>
          <p className='text-cyan-400 text-xs uppercase tracking-wider mb-2'>Our Story</p>
          <h2 className='text-3xl font-bold mb-6'>How It All Started</h2>
          <div className='space-y-4 text-gray-400 leading-relaxed max-w-3xl'>
            <p>Seorin Play was founded in 2022 by a group of passionate film enthusiasts who believed the streaming experience could be better — smarter recommendations, a cleaner interface, and content that truly matters.</p>
            <p>Starting with just a few hundred titles, we've grown to offer over 10,000 movies and TV shows spanning every genre imaginable. Our team works tirelessly to license the best content and deliver it in the highest possible quality.</p>
            <p>Today, Seorin Play is one of the fastest-growing entertainment platforms, trusted by millions of viewers across 50+ countries.</p>
          </div>
        </div>

        {/* Team */}
        <div>
          <div className='text-center mb-10'>
            <p className='text-cyan-400 text-xs uppercase tracking-wider mb-2'>Our Team</p>
            <h2 className='text-3xl font-bold mb-3'>The People Behind It</h2>
            <p className='text-gray-400 max-w-xl mx-auto'>A diverse team of engineers, designers, curators, and storytellers united by a love for great content.</p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12'>
            {team.map(({ name, role }) => (
              <div key={name} className='bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-indigo-500/40 transition-colors'>
                <div className='size-14 rounded-full bg-linear-to-br from-purple-600 to-indigo-600 mx-auto mb-3 flex items-center justify-center text-lg font-bold'>
                  {name[0]}
                </div>
                <p className='text-white font-semibold'>{name}</p>
                <p className='text-gray-500 text-sm mt-1'>{role}</p>
              </div>
            ))}
          </div>
          <div className='text-center'>
            <Link to='/contact' className='inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors'>
              Get in Touch <ChevronRight className='size-4' />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About