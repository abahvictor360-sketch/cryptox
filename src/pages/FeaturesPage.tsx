import PageHeader from '../components/PageHeader'
import FeatureShowcase from '../sections/FeatureShowcase'
import FeatureGrid from '../sections/FeatureGrid'
import CtaBanner from '../sections/CtaBanner'

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="Tools built for smarter trading"
        subtitle="From AI signals to automated risk controls, everything your team needs to trade with confidence."
      />
      <FeatureGrid />
      <FeatureShowcase />
      <CtaBanner />
    </>
  )
}
