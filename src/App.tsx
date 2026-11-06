import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ShareBar from './components/ShareBar'
import Countdown from './components/Countdown'
import Story from './components/Story'
import OursNote from './components/OursNote'
import Events from './components/Events'
import Patrika from './components/Patrika'
import Timeline from './components/Timeline'
import Travel from './components/Travel'
import Faq from './components/Faq'
import Blessings from './components/Blessings'
import Footer from './components/Footer'
import MusicToggle from './components/MusicToggle'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ShareBar />
        <Countdown />
        <Story />
        <OursNote />
        <Events />
        <Patrika />
        <Timeline />
        <Travel />
        <Faq />
        <Blessings />
      </main>
      <Footer />
      <MusicToggle />
    </>
  )
}
