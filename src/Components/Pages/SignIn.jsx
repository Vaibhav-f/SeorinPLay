import React, { useState } from 'react'
import { Mail, Eye, EyeOff, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [captcha, setCaptcha] = useState(false)
  const [remember, setRemember] = useState(false)
  const [attempts, setAttempts] = useState(3)
  const [locked, setLocked] = useState(false)
  const [success, setSuccess] = useState(false)
  const [emailErr, setEmailErr] = useState('')
  const [pwErr, setPwErr] = useState('')

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  const validatePw = (v) => v.length >= 8

  const isReady = captcha && validateEmail(email) && validatePw(password) && !locked

  const handleSubmit = () => {
    if (!isReady) return
    // Demo credentials — replace with real auth
    if (email === 'demo@seorinplay.com' && password === 'Demo@1234') {
      setSuccess(true)
    } else {
      const left = attempts - 1
      setAttempts(left)
      if (left <= 0) setLocked(true)
    }
  }

  return (
    <div className='min-h-screen bg-[#0a0d1a] flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md bg-[#0f1422] border border-white/8 rounded-2xl p-8'>

        {/* Logo */}
        <div className='flex items-center justify-center gap-2 mb-6'>
          <div className='w-8 h-8 bg-violet-700 rounded-lg flex items-center justify-center text-white text-sm'>▶</div>
          <span className='text-purple-400 text-xl font-bold'>Seorin <span className='text-indigo-400'>Play</span></span>
        </div>

        <h2 className='text-white text-2xl font-semibold text-center mb-1'>Welcome back</h2>
        <p className='text-white/40 text-sm text-center mb-6'>Sign in to continue watching</p>

        {/* Success toast */}
        {success && (
          <div className='flex items-center gap-2 bg-green-500/10 border border-green-500/25 rounded-xl px-4 py-3 mb-4'>
            <CheckCircle className='size-4 text-green-400 shrink-0' />
            <span className='text-green-300 text-sm'>Signed in successfully! Redirecting...</span>
          </div>
        )}

        {/* Attempts warning */}
        {attempts < 3 && !success && (
          <div className='flex items-center gap-2 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3 mb-4'>
            <AlertTriangle className='size-4 text-red-400 shrink-0' />
            <span className='text-red-400 text-sm'>
              {locked ? 'Account temporarily locked. Try again in 10 minutes.' : `${attempts} attempt${attempts > 1 ? 's' : ''} remaining before lockout.`}
            </span>
          </div>
        )}

        {/* Email */}
        <div className='mb-4'>
          <label className='block text-white/50 text-xs mb-1.5 tracking-wide'>Email address</label>
          <div className='relative'>
            <input
              type='email'
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                setEmailErr(e.target.value && !validateEmail(e.target.value) ? 'Enter a valid email.' : '')
              }}
              placeholder='you@example.com'
              disabled={locked || success}
              className={`w-full bg-white/5 border rounded-xl px-4 pr-10 h-11 text-white text-sm placeholder:text-white/25 outline-none transition-all
                ${emailErr ? 'border-red-500/60' : 'border-white/10 focus:border-violet-500/60 focus:bg-violet-500/5'}`}
            />
            <Mail className='absolute right-3 top-1/2 -translate-y-1/2 size-4 text-white/25' />
          </div>
          {emailErr && <p className='text-red-400 text-xs mt-1'>{emailErr}</p>}
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label className='block text-white/50 text-xs mb-1.5 tracking-wide'>Password</label>
          <div className='relative'>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                setPwErr(e.target.value && !validatePw(e.target.value) ? 'Minimum 8 characters required.' : '')
              }}
              placeholder='Enter your password'
              disabled={locked || success}
              className={`w-full bg-white/5 border rounded-xl px-4 pr-10 h-11 text-white text-sm placeholder:text-white/25 outline-none transition-all
                ${pwErr ? 'border-red-500/60' : 'border-white/10 focus:border-violet-500/60 focus:bg-violet-500/5'}`}
            />
            <button onClick={() => setShowPw(s => !s)} className='absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60' aria-label='Toggle password'>
              {showPw ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
            </button>
          </div>
          {pwErr && <p className='text-red-400 text-xs mt-1'>{pwErr}</p>}
        </div>

        {/* Remember + Forgot */}
        <div className='flex items-center justify-between mb-4'>
          <label className='flex items-center gap-2 text-white/50 text-sm cursor-pointer'>
            <input type='checkbox' checked={remember} onChange={e => setRemember(e.target.checked)} className='accent-violet-600 w-3.5 h-3.5' />
            Remember me
          </label>
          <a href='#' className='text-violet-400 hover:text-violet-300 text-sm'>Forgot password?</a>
        </div>

        {/* Captcha */}
        <div
          onClick={() => !locked && setCaptcha(true)}
          className={`flex items-center justify-between bg-white/3 border border-white/8 rounded-xl px-4 py-3 mb-4 cursor-pointer transition-all
            ${captcha ? 'border-violet-500/30' : 'hover:border-white/15'}`}
        >
          <div className='flex items-center gap-3'>
            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all
              ${captcha ? 'bg-violet-600 border-violet-600' : 'border-white/20'}`}>
              {captcha && <CheckCircle className='size-3 text-white' />}
            </div>
            <span className='text-white/50 text-sm'>I'm not a robot</span>
          </div>
          <div className='text-right'>
            <ShieldCheck className='size-5 text-white/15 ml-auto' />
            <p className='text-white/20 text-[10px]'>reCAPTCHA</p>
          </div>
        </div>

        {/* Sign in button */}
        <button
          onClick={handleSubmit}
          disabled={!isReady}
          className='w-full h-12 bg-violet-700 hover:bg-violet-600 disabled:bg-violet-700/40 disabled:cursor-not-allowed active:scale-98 transition-all rounded-xl text-white font-semibold text-sm'
        >
          Sign in
        </button>

        <div className='flex items-center gap-3 my-4'>
          <div className='flex-1 h-px bg-white/8' />
          <span className='text-white/30 text-xs'>or</span>
          <div className='flex-1 h-px bg-white/8' />
        </div>

        {/* Google */}
        <button className='w-full h-11 bg-transparent border border-white/10 hover:bg-white/4 active:scale-98 transition-all rounded-xl text-white/70 text-sm flex items-center justify-center gap-2'>
          <svg className='size-4' viewBox='0 0 24 24'><path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/><path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/><path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'/><path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/></svg>
          Continue with Google
        </button>

        <p className='text-center text-white/40 text-sm mt-5'>
          Don't have an account? <a href='#' className='text-violet-400 hover:text-violet-300'>Sign up for free</a>
        </p>

      </div>
    </div>
  )
}

export default SignIn