import Feature from '@/components/Custom/Feature'
import Footer from '@/components/Custom/Footer'
import Header from '@/components/Custom/Header'
import StepsGuide from '@/components/Custom/StepsGuide'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/clerk-react'
import { ArrowRight, Play, Stars } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'animate.css';

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated-once')) {
            entry.target.classList.add('animate__animated');
            entry.target.classList.add(entry.target.dataset.animation);
            entry.target.classList.add('animated-once');
          }
        });
      },
      {
        threshold: 0.1, // Adjust this value as needed
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <div>
      <Header />
      <div className="overflow-hidden">
        <div className='my-24 md:my-52 px-4'>
          <h1 className='font-extrabold text-[28px] md:text-[35px] text-center animate-on-scroll' data-animation="animate__zoomInDown">
            "Build Your Dream <span className='text-blue-800'>Resume with AI-Powered</span> Precision"
          </h1>
          <h2 className='font-bold text-sm md:text-lg text-gray-400 text-center my-3 md:my-5 animate-on-scroll' data-animation="animate__jackInTheBox">
            Let AI guide you to the perfect resume that lands you the job.
          </h2>
          <div className='flex justify-center'>
            <Link to='/dashboard'>
              <Button className='flex gap-3 hover:opacity-75 shadow-lg' size="sm">
                <Stars /> Try it Now <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <Feature />
        <StepsGuide />
        <Footer />
      </div>
    </div>
  )
}

export default Home
