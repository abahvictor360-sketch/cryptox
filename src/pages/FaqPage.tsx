import PageHeader from '../components/PageHeader'
import Faq from '../sections/Faq'
import CtaBanner from '../sections/CtaBanner'

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions? We've got answers"
        subtitle="Everything you need to know about accounts, security, fees and our API."
      />
      <Faq />
      <CtaBanner />
    </>
  )
}
