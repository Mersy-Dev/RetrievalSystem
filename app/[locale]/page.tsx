import Hero from '@/components/home/Hero'
import InfoSearch from '@/components/home/InfoSearch'
import MalariaFAQ from '@/components/home/MalariaFAQ'
import MalBody from '@/components/home/MalBody'


export default function Home() {
  return (
    <main>
      <Hero />
      <MalBody />
      <InfoSearch />
      <MalariaFAQ />
      
    </main>
  )
}
