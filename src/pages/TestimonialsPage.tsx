import PageHeader from '../components/PageHeader'
import Testimonials from '../sections/Testimonials'
import Stats from '../sections/Stats'
import CtaBanner from '../sections/CtaBanner'

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Loved by 2,500+ organizations"
        subtitle="Founders, CFOs and trading desks share how Cryptox changed the way they work."
      />
      <Testimonials />
      <Stats />
      <CtaBanner />
    </>
  )
}
