import './assets/App.css'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import GalleryCategories from './components/GalleryCategories'
import GallerySection from './components/GallerySection'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <main className='relative w-full flex flex-col items-center'>
      <HeroSection />
      <div className='relative z-10 md:mt-[250vh] mt-[350vh] w-full'>
        <AboutUs />
        <GallerySection />
        <GalleryCategories />
        <ContactUs />
        <Footer />
      </div>
    </main>
  )
}

export default App
