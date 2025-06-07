import FeatureGrid from '@/components/features/FeatureGrid'
import Hero from '@/components/home/Hero'
import MalariaFAQ from '@/components/home/MalariaFAQ'
import MalBody from '@/components/home/MalBody'


export default function Home() {
  return (
    <main>
      <Hero />
      <MalBody />
      <FeatureGrid />
      <MalariaFAQ />
      
    </main>
  )
}
