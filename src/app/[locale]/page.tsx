'use client'

import '../style/page.scss'
import HeroContainerInterior from '@/components/ui/home/HeroContainerInterior'
import FeaturesSection from '@/components/ui/home/FeatureStation'
import HowItWorksSection from '@/components/ui/home/HowItWorksStation'
import CTASection from '@/components/ui/home/CTASection'
import FAQSection from '@/components/ui/home/FAQSection'
import Footer from '@/components/ui/home/Footer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTranslationContext } from '@/i18n/TranslationContext'
import { useEffect } from 'react'
import AddWorkType from '@/components/AddWorkType'

export default function Home() {
  const { t, locale } = useTranslationContext()
  const { data: session, status } = useSession()
  const router = useRouter()

  const loading = status === 'loading'

  useEffect(() => {
    if (session?.user) {
      router.push(`/${locale}/start`)
    }
  }, [session?.user, router, locale])

  if (loading || session?.user) {
    return null
  }

  return (
    <div className="content">
      <HeroContainerInterior />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  )
}