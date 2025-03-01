import { useScroll, useTransform } from 'framer-motion';
import Camera from './Camera'
import Typewriter from './Typewriter'

function HeroSection() {
  const { scrollYProgress } = useScroll();

  const textY = useTransform(scrollYProgress, [0.15, 0.45], [-250, -900]);

  return (
    <section className="fixed top-0 left-0 h-screen flex items-center justify-center overflow-hidden w-[80%]" >
      <Typewriter value={`"Capturing Moments, Creating Stories"`} textY={textY} />
      <Camera />
    </section>
  )
}
export default HeroSection