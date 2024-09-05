import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import './styles.css'
import Seo from '@/components/Seo'
import HeadingSection from './components/HeadingSection'
import ImageSection from './components/ImageSection'
import FeatureSection from './components/FeatureSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Seo metaRobots="index" url="https://legisbot.com.ar" />
      <MaxWidthWrapper className="mb-12 mt-28">
        <HeadingSection />
        <ImageSection />
        <FeatureSection />
      </MaxWidthWrapper>
      <Footer />
    </>
  )
}
