import React from 'react'
import { FileText } from 'lucide-react'

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using Seorin Play, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service. We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting.`,
  },
  {
    title: 'Account Registration',
    content: `To access certain features of our service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information as needed. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.`,
  },
  {
    title: 'Subscription & Billing',
    content: `Seorin Play offers various subscription plans. By subscribing, you authorize us to charge your payment method on a recurring basis. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period. You may cancel your subscription at any time through your account settings. No refunds are provided for partial subscription periods.`,
  },
  {
    title: 'Content & Intellectual Property',
    content: `All content available on Seorin Play, including movies, TV shows, logos, and software, is owned by or licensed to Seorin Play and is protected by intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our express written permission. Your subscription grants you a limited, non-exclusive, non-transferable license to stream content for personal, non-commercial use only.`,
  },
  {
    title: 'Prohibited Conduct',
    content: `You agree not to use the service to: violate any applicable laws or regulations; infringe on third-party intellectual property rights; transmit harmful, offensive, or inappropriate content; interfere with the proper functioning of the service; use automated tools to scrape or download content; share your account credentials with others; or circumvent any geographic restrictions or copy protection measures.`,
  },
  {
    title: 'Disclaimer of Warranties',
    content: `The service is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. Seorin Play does not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components. We make no warranties regarding the accuracy, completeness, or availability of any content on the platform.`,
  },
  {
    title: 'Limitation of Liability',
    content: `To the fullest extent permitted by law, Seorin Play shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the service. Our total liability to you for any claim shall not exceed the amount you paid for the subscription in the three months preceding the claim.`,
  },
  {
    title: 'Termination',
    content: `We reserve the right to suspend or terminate your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, third parties, or for any other reason. Upon termination, your right to use the service will immediately cease.`,
  },
]

const TermsPage = () => {
  return (
    <div className='min-h-screen bg-[#0a0f1e] text-white'>

      {/* Hero */}
      <div className='bg-linear-to-b from-purple-900/20 to-transparent px-4 md:px-8 pt-24 pb-12 text-center'>
        <div className='size-14 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mx-auto mb-5'>
          <FileText className='size-7 text-purple-400' />
        </div>
        <p className='text-purple-400 text-xs font-semibold uppercase tracking-widest mb-3'>Legal</p>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Terms of Service</h1>
        <p className='text-gray-500 text-sm'>Last Updated: December 1, 2024</p>
      </div>

      <div className='max-w-3xl mx-auto px-4 md:px-8 pb-20'>

        <div className='bg-purple-500/10 border border-purple-500/20 rounded-2xl px-6 py-4 mb-10 text-sm text-purple-300 leading-relaxed'>
          Please read these Terms of Service carefully before using Seorin Play. By using our service, you agree to these terms.
        </div>

        <div className='space-y-8'>
          {sections.map((section, i) => (
            <div key={section.title} className='border-b border-white/5 pb-8 last:border-0'>
              <div className='flex items-start gap-4 mb-3'>
                <span className='text-purple-400 font-bold text-sm mt-0.5 shrink-0'>0{i + 1}</span>
                <h2 className='text-xl font-semibold text-white'>{section.title}</h2>
              </div>
              <p className='text-gray-400 leading-relaxed pl-8'>{section.content}</p>
            </div>
          ))}
        </div>

        <div className='mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center'>
          <p className='text-gray-400 text-sm mb-1'>Questions about our Terms?</p>
          <p className='text-white font-medium'>Email us at <span className='text-purple-400'>legal@seorinplay.com</span></p>
        </div>

      </div>
    </div>
  )
}

export default TermsPage