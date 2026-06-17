import React, { useState } from 'react'
import { ChevronDown, Search, PlayCircle, CreditCard, Settings, Wifi, Lock, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  { icon: PlayCircle,  label: 'Streaming',     color: 'text-purple-400' },
  { icon: CreditCard, label: 'Billing',        color: 'text-cyan-400' },
  { icon: Settings,   label: 'Account',        color: 'text-indigo-400' },
  { icon: Wifi,       label: 'Connectivity',   color: 'text-green-400' },
  { icon: Lock,       label: 'Security',       color: 'text-yellow-400' },
  { icon: HelpCircle, label: 'General',        color: 'text-pink-400' },
]

const faqs = [
  {
    q: 'How do I create an account on Seorin Play?',
    a: 'Click the "Sign Up" button on the homepage. Enter your email address and create a password. You\'ll receive a verification email — click the link inside to activate your account. Once verified, you\'re ready to start streaming!',
  },
  {
    q: 'What subscription plans are available?',
    a: 'We offer three plans: Basic (720p, 1 screen), Standard (1080p, 2 screens), and Premium (4K + HDR, 4 screens). All plans include access to our full content library. You can upgrade or downgrade your plan at any time from account settings.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Go to Account Settings → Subscription → Cancel Plan. Your access continues until the end of the current billing period. You won\'t be charged again after cancellation, and you can resubscribe at any time.',
  },
  {
    q: 'Why is my video buffering or loading slowly?',
    a: 'Buffering is usually caused by a slow internet connection. For 4K streaming, we recommend at least 25 Mbps. Try: closing other bandwidth-heavy apps, connecting via Ethernet instead of Wi-Fi, restarting your router, or lowering the video quality in the player settings.',
  },
  {
    q: 'Can I download movies to watch offline?',
    a: 'Yes! Premium and Standard plan subscribers can download select titles for offline viewing. Look for the download icon (↓) on supported content. Downloads are stored for up to 30 days and must be watched within 48 hours of starting.',
  },
  {
    q: 'How many screens can I watch on simultaneously?',
    a: 'It depends on your plan: Basic allows 1 screen, Standard allows 2 screens, and Premium allows up to 4 screens at the same time. You\'ll see an error message if you try to exceed your plan\'s screen limit.',
  },
  {
    q: 'I forgot my password. How do I reset it?',
    a: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a reset link that\'s valid for 24 hours. If you don\'t see it in your inbox, check your spam folder.',
  },
  {
    q: 'Is Seorin Play available on my device?',
    a: 'Seorin Play is available on web browsers, iOS and Android phones, smart TVs (Samsung, LG, Android TV), Amazon Fire Stick, Roku, PlayStation, and Xbox. Download our app from your device\'s app store.',
  },
]

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className='border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors'
    >
      <button
        onClick={() => setOpen(o => !o)}
        className='w-full flex items-center justify-between px-6 py-5 text-left gap-4'
      >
        <span className='text-white font-medium text-sm md:text-base'>{q}</span>
        <ChevronDown className={`size-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className='px-6 pb-5'>
          <p className='text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4'>{a}</p>
        </div>
      )}
    </div>
  )
}

const HelpCenterPage = () => {
  const [query, setQuery] = useState('')

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(query.toLowerCase()) ||
    f.a.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-[#0a0f1e] text-white'>

      {/* Hero */}
      <div className='bg-linear-to-b from-indigo-900/25 to-transparent px-4 md:px-8 pt-24 pb-12 text-center'>
        <p className='text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3'>Support</p>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Help Center</h1>
        <p className='text-gray-400 max-w-lg mx-auto mb-8'>Find answers to common questions or reach out to our support team.</p>
        {/* Search */}
        <div className='flex items-center bg-white/5 border border-white/10 focus-within:border-indigo-500/50 rounded-full px-5 py-3 max-w-md mx-auto gap-3 transition-colors'>
          <Search className='size-4 text-gray-500 shrink-0' />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search for help...'
            className='bg-transparent flex-1 text-sm text-white placeholder:text-gray-600 outline-none'
          />
        </div>
      </div>

      <div className='max-w-4xl mx-auto px-4 md:px-8 pb-20'>

        {/* Categories */}
        {!query && (
          <div className='grid grid-cols-3 md:grid-cols-6 gap-3 mb-12'>
            {categories.map(({ icon: Icon, label, color }) => (
              <div key={label} className='bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/8 transition-colors cursor-pointer'>
                <Icon className={`size-5 ${color} mx-auto mb-2`} />
                <p className='text-gray-400 text-xs'>{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* FAQs */}
        <div>
          <h2 className='text-xl font-semibold mb-5'>
            {query
              ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"`
              : 'Frequently Asked Questions'
            }
          </h2>
          <div className='space-y-3'>
            {filtered.length > 0
              ? filtered.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)
              : (
                <div className='text-center py-12 text-gray-500'>
                  <HelpCircle className='size-10 mx-auto mb-3 opacity-40' />
                  <p>No results found. Try a different search term.</p>
                </div>
              )
            }
          </div>
        </div>

        {/* Still need help */}
        <div className='mt-14 bg-linear-to-r from-purple-900/30 to-indigo-900/30 border border-white/10 rounded-3xl p-8 text-center'>
          <h3 className='text-xl font-bold mb-2'>Still need help?</h3>
          <p className='text-gray-400 text-sm mb-5'>Our support team is available 24/7 and typically responds within a few hours.</p>
          <Link
            to='/contact'
            className='inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-full font-semibold text-sm transition-colors'
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  )
}

export default HelpCenterPage