import PageHeader from '../components/PageHeader'
import WhyChoose from '../sections/WhyChoose'
import Stats from '../sections/Stats'
import LogoStrip from '../sections/LogoStrip'
import CtaBanner from '../sections/CtaBanner'

export default function WhyChoosePage() {
  return (
    <>
      <PageHeader
        eyebrow="Why choose us"
        title="The trading partner your business deserves"
        subtitle="Security, compliance and speed — designed for organizations that can't afford downtime."
      />
      <Stats />
      <WhyChoose />
      <LogoStrip />
      <CtaBanner />
    </>
  )
}
