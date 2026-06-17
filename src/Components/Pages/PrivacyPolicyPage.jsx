import React from 'react'
import { Shield } from 'lucide-react'

const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, update your profile, or contact us for support. This includes your name, email address, password, and payment information. We also automatically collect certain information when you use our service, including your IP address, browser type, device information, and viewing history.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and promotional communications, and respond to your comments and questions. We may also use your data to personalize your experience, showing you content we think you'll love based on your viewing habits.`,
  },
  {
    title: 'Information Sharing',
    content: `We do not share your personal information with third parties except as described in this policy. We may share your data with service providers who assist us in operating our platform, conducting our business, or servicing you. These parties are contractually bound to keep your information confidential and use it only to perform services on our behalf.`,
  },
  {
    title: 'Data Security',
    content: `We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes using SSL/TLS encryption for data in transit and AES-256 encryption for data at rest. However, no method of transmission over the Internet or method of electronic storage is 100% secure.`,
  },
  {
    title: 'Cookies & Tracking',
    content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our service may not function properly.`,
  },
  {
    title: 'Your Rights & Choices',
    content: `You have the right to access, update, or delete your personal information at any time through your account settings. You may also opt out of receiving promotional communications from us by following the instructions in those messages. Residents of certain regions, including the European Economic Area, have additional rights such as the right to data portability and the right to restrict processing.`,
  },
  {
    title: 'Children\'s Privacy',
    content: `Our service is not directed to children under 13 years of age. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us immediately so we can take appropriate action.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.`,
  },
]

const PrivacyPolicyPage = () => {
  return (
    <div className='min-h-screen bg-[#0a0f1e] text-white'>

      {/* Hero */}
      <div className='bg-linear-to-b from-indigo-900/25 to-transparent px-4 md:px-8 pt-24 pb-12 text-center'>
        <div className='size-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5'>
          <Shield className='size-7 text-indigo-400' />
        </div>
        <p className='text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3'>Legal</p>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Privacy Policy</h1>
        <p className='text-gray-500 text-sm'>Last Updated: December 1, 2024</p>
      </div>

      <div className='max-w-3xl mx-auto px-4 md:px-8 pb-20'>

        <div className='bg-indigo-500/10 border border-indigo-500/20 rounded-2xl px-6 py-4 mb-10 text-sm text-indigo-300 leading-relaxed'>
          Your privacy is important to us. This policy explains what information we collect, how we use it, and your rights regarding your personal data when you use Seorin Play.
        </div>

        <div className='space-y-8'>
          {sections.map((section, i) => (
            <div key={section.title} className='border-b border-white/5 pb-8 last:border-0'>
              <div className='flex items-start gap-4 mb-3'>
                <span className='text-indigo-400 font-bold text-sm mt-0.5 shrink-0'>0{i + 1}</span>
                <h2 className='text-xl font-semibold text-white'>{section.title}</h2>
              </div>
              <p className='text-gray-400 leading-relaxed pl-8'>{section.content}</p>
            </div>
          ))}
        </div>

        <div className='mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center'>
          <p className='text-gray-400 text-sm mb-1'>Questions about our privacy practices?</p>
          <p className='text-white font-medium'>Email us at <span className='text-indigo-400'>privacy@seorinplay.com</span></p>
        </div>

      </div>
    </div>
  )
}

export default PrivacyPolicyPage