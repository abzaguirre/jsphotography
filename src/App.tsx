import './assets/App.css'
import HeroSection from './components/HeroSection'

function App() {

  return (
    <>
      <div className="min-h-[200vh]">
        <HeroSection />
      </div>
      <div className='min-h-[100vh] w-full'>
        <h1 className='text-blue-500'> About Us</h1>
      </div>
    </>
  )
}

export default App
