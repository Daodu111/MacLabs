import { HeroSection } from '../components/hero-section'
import { TrustedBySection } from '../components/trusted-by-section'
import { ServicesSection } from '../components/services-section'
import { WhyChooseSection } from '../components/why-choose-section'
import { TestimonialsSection } from '../components/testimonials-section'
import { HowWeWorkSection } from '../components/how-we-work-section'
import { BookingSection } from '../components/booking-section'

interface HomePageProps {
  onPageChange: (page: string) => void
}

export function HomePage({ onPageChange }: HomePageProps) {
  const handleGetStarted = () => {
    onPageChange('contact')
  }

  return (
    <div>
      <HeroSection onGetStarted={handleGetStarted} />
      <TrustedBySection />
      <ServicesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <HowWeWorkSection />
      <BookingSection />
    </div>
  )
}