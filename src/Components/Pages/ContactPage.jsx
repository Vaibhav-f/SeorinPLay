import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  { icon: Mail,    label: 'Email Us',      value: 'support@seorinplay.com' },
  { icon: Phone,   label: 'Call Us',       value: '+1 (800) 123-4567' },
  { icon: MapPin,  label: 'Our Office',    value: 'San Francisco, CA 94105' },
]

const ContactPage = () => {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  return (
    <div className='min-h-screen bg-[#0a0f1e] text-white'>

      {/* Hero */}
      <div className='bg-linear-to-b from-cyan-900/20 to-transparent px-4 md:px-8 pt-24 pb-12 text-center'>
        <p className='text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3'>Contact</p>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
          Get In <span className='text-cyan-400'>Touch</span>
        </h1>
        <p className='text-gray-400 max-w-xl mx-auto text-lg leading-relaxed'>
          Have a question or feedback? We'd love to hear from you. Our team usually responds within 24 hours.
        </p>
      </div>

      <div className='max-w-5xl mx-auto px-4 md:px-8 pb-20'>

        {/* Contact Info Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
          {contactInfo.map(({ icon: Icon, label, value }) => (
            <div key={label} className='bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors'>
              <div className='size-11 rounded-full bg-cyan-500/15 flex items-center justify-center mx-auto mb-3'>
                <Icon className='size-5 text-cyan-400' />
              </div>
              <p className='text-gray-400 text-xs uppercase tracking-wider mb-1'>{label}</p>
              <p className='text-white text-sm font-medium'>{value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className='bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12'>
          {submitted ? (
            <div className='text-center py-12'>
              <CheckCircle className='size-16 text-cyan-400 mx-auto mb-5' />
              <h2 className='text-2xl font-bold mb-2'>Message Sent!</h2>
              <p className='text-gray-400'>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                className='mt-8 text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-2 transition-colors'
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className='text-2xl font-bold mb-8'>Send a Message</h2>
              <div className='space-y-5'>
                <div className='grid md:grid-cols-2 gap-5'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-gray-400 text-sm'>Your Name <span className='text-red-400'>*</span></label>
                    <input
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      placeholder='John Doe'
                      className='bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-colors'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-gray-400 text-sm'>Email Address <span className='text-red-400'>*</span></label>
                    <input
                      name='email'
                      type='email'
                      value={form.email}
                      onChange={handleChange}
                      placeholder='john@example.com'
                      className='bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-colors'
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-gray-400 text-sm'>Subject</label>
                  <input
                    name='subject'
                    value={form.subject}
                    onChange={handleChange}
                    placeholder='What is this about?'
                    className='bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-colors'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-gray-400 text-sm'>Message <span className='text-red-400'>*</span></label>
                  <textarea
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder='Write your message here...'
                    className='bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-colors resize-none'
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className='flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-white px-7 py-3 rounded-full font-semibold text-sm transition-all'
                >
                  <Send className='size-4' /> Send Message
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default ContactPage