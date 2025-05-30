import React from 'react'

function Feature() {
  return (
    <div className='py-8 md:py-16 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
    <h1 className='text-black-400 text-2xl md:text-4xl text-center mt-10 md:mt-20 font-bold animate-on-scroll' data-animation="animate__wobble">FEATURE</h1>
    <div className='my-16 mx-20 md:mx-16'>
      <div className='flex my-10 flex-col md:flex-row justify-start gap-8 animate-on-scroll' data-animation="animate__rotateInDownLeft">
        <div>
          <img src="bot.png" className='w-[150px] h-[150px] md:w-[200px] md:h-[200px]' alt="AI-Powered Suggestions" />
        </div>
        <div className='mt-5 md:mt-20'>
          <h1 className='font-extrabold text-white text-lg md:text-xl'>AI-Powered Suggestions:</h1>
          <p className='text-sm md:text-base'>Describe how AI helps in crafting the best resume.</p>
        </div>
      </div>

      <div className='flex my-10 flex-col md:flex-row justify-end gap-8 animate-on-scroll' data-animation="animate__rotateInDownRight">
        <div className='order-2 md:order-1'>
          <div className='mt-5 md:mt-20'>
            <h1 className='font-extrabold text-white text-lg md:text-xl'>Customizable Templates:</h1>
            <p className='text-sm md:text-base'>Showcase a few examples of resume templates.</p>
          </div>
        </div>
        <div className='order-1 md:order-2'>
          <img src="template.png" className='w-[150px] h-[150px] md:w-[200px] md:h-[200px]' alt="Customizable Templates" />
        </div>
      </div>

      <div className='flex my-10 flex-col md:flex-row justify-start gap-8 animate-on-scroll' data-animation="animate__slideInDown">
        <div>
          <img src="Real-time-feedback.png" className='w-[150px] h-[150px] md:w-[200px] md:h-[200px]' alt="Real-Time Feedback" />
        </div>
        <div className='mt-5 md:mt-20'>
          <h1 className='font-extrabold text-white text-lg md:text-xl'>Real-Time Feedback:</h1>
          <p className='text-sm md:text-base'>Explain how users get instant feedback on their resumes.</p>
        </div>
      </div>

      <div className='flex my-10 flex-col md:flex-row justify-end gap-8 animate-on-scroll' data-animation="animate__slideInUp">
        <div className='order-2 md:order-1'>
          <div className='mt-5 md:mt-20'>
            <h1 className='font-extrabold text-white text-lg md:text-xl'>Easy-to-Use Interface:</h1>
            <p className='text-sm md:text-base'>Emphasize the simplicity and user-friendliness of the platform.</p>
          </div>
        </div>
        <div className='order-1 md:order-2'>
          <img src="interface.png" className='w-[150px] h-[150px] md:w-[200px] md:h-[200px]' alt="Easy-to-Use Interface" />
        </div>
      </div>
    </div>
  </div>  
  )
}

export default Feature
