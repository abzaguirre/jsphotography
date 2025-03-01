import './assets/App.css'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import GallerySection from './components/GallerySection'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <main className='relative w-full flex flex-col items-center'>
      <HeroSection />
      <div className='relative z-10 mt-[400vh] w-full'>
        <AboutUs />
        <GallerySection />
        <ContactUs />
        <Footer />
      </div>
    </main>
  )
}

export default App
