import BrandButton from '../components/BrandButton'
import PageHeader from '../components/PageHeader'

export default function NotFound() {
  return (
    <div className="pb-32 text-center">
      <PageHeader eyebrow="404" title="Page not found" subtitle="The page you're looking for doesn't exist or has moved." />
      <BrandButton to="/">Back home</BrandButton>
    </div>
  )
}
