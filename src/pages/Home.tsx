import Hero from '../sections/Hero'
import LogoStrip from '../sections/LogoStrip'
import FeatureShowcase from '../sections/FeatureShowcase'
import Stats from '../sections/Stats'
import WhyChoose from '../sections/WhyChoose'
import Testimonials from '../sections/Testimonials'
import Faq from '../sections/Faq'
import CtaBanner from '../sections/CtaBanner'

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <FeatureShowcase />
      <Stats />
      <WhyChoose />
      <Testimonials limit={3} />
      <Faq />
      <CtaBanner />
    </>
  )
}
