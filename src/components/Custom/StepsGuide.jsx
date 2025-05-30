import React from 'react';

function StepsGuide() {
  return (
    <div>
      <div className='description panel red bg-red-500'>
          <h1 className='text-center py-10 md:py-20 font-extrabold text-2xl md:text-3xl text-white'>Step by Step Guide</h1>
          <div className='flex flex-col md:flex-row py-8 md:py-16 px-4 md:px-16 gap-8'>
            <div className='animate-on-scroll' data-animation="animate__fadeInDown">
              <img src="dashboard.png" alt="Dashboard Overview" />
            </div>
            <div className='my-8 mx-10 md:my-14 animate-on-scroll' data-animation="animate__fadeInLeft">
              <h1 className="font-bold text-lg md:text-xl text-blue-800">Step 1: Dashboard Overview</h1>
              <ul className='text-gray-200 text-sm md:text-base'>
                <li>Begin your journey on the Dashboard, where all your resumes are neatly organized.</li>
                <li>Create a new resume with ease, or manage existing ones from the same interface.</li>
                <li>Each resume features a three-dot menu that opens a dropdown with options to:
                  <ul>
                    <li>Edit: Make changes to your resume anytime.</li>
                    <li>View: Preview your resume to see how it looks.</li>
                    <li>Download: Save a copy of your resume in PDF format.</li>
                    <li>Delete: Remove resumes you no longer need.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='panel blue flex flex-col md:flex-row py-16 md:py-40 px-4 md:px-16 gap-5 bg-blue-300'>
        <div className='animate-on-scroll' data-animation="animate__fadeInRight">
          <img className='h-auto max-w-[100%]' src="person-details.png" alt="Personal Details Form" />
        </div>
        <div className='py-4 mx-10 md:py-8 animate-on-scroll' data-animation="animate__fadeInUp">
          <h1 className="font-bold text-lg md:text-xl text-blue-800">Step 2: Personal Details Form</h1>
          <ul className='text-gray-200 text-sm md:text-base'>
              <li>Fill in essential personal details:
                <ul>
                  <li>First Name & Last Name</li>
                  <li>Job Title</li>
                  <li>Address</li>
                  <li>Phone Number</li>
                  <li>Email</li>
                  <li>Theme Color: Customize the look and feel of your resume.</li>
                </ul>
              </li>
              <li>Every detail you enter is instantly reflected in the resume preview, allowing you to see updates in real time.</li>
            </ul>
          </div>
        </div>


        <div className='panel blue flex flex-col md:flex-row py-16 md:py-40 px-4 md:px-16 gap-5  bg-orange-500'>
          <div className='animate-on-scroll' data-animation="animate__fadeInTopRight">
            <img className='h-auto max-w-[100%]' src="summay.png" alt="Summary Details Form" />
          </div>
          <div className='py-4 mx-10 md:py-8 animate-on-scroll' data-animation="animate__fadeInBottomLeft">
            <h1 className="font-bold text-lg md:text-xl text-blue-800">Step 3: Craft Your Summary</h1>
            <ul className='text-gray-200 text-sm md:text-base'>    
              <li>Write a compelling short summary that captures your professional essence.</li>
              <li>Not sure what to say? Use the AI feature to generate a summary tailored to your experience level:
                <ul>
                  <li>Fresher: Highlight your education and eagerness to learn.</li>
                  <li>Mid-Level: Focus on your growing expertise and contributions.</li>
                  <li>High-Level: Emphasize your leadership and significant achievements.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>


        <div className='panel blue flex flex-col md:flex-row py-16 md:py-40 px-4 md:px-16 gap-5  bg-purple-500'>
          <div className='animate-on-scroll' data-animation="animate__flipInX">
            <img className='h-auto max-w-[100%]' src="experience.png" alt="Experience Details Form" />
          </div>
          <div className='py-4 mx-10 md:py-8 animate-on-scroll' data-animation="animate__flipInY">
            <h1 className="font-bold text-lg md:text-xl text-blue-800">Step 4: Experience Details</h1>
            <ul className='text-gray-200 text-sm md:text-base'>        
              <li>Write a compelling short summary that captures your professional essence.</li>
              <li>Provide detailed information about your work history:
                <ul>
                  <li>Position Title</li>
                  <li>Company Name</li>
                  <li>City & State</li>
                  <li>Start & End Dates</li>
                  <li>Experience Summary: Describe your roles and responsibilities.</li>
                </ul>
              </li>
              <li>Enhance your summary using the AI generator, or customize it directly in the text editor with options like bold text, bullet points, and more.</li>
              <li>Add multiple experiences using the "Add More Experience" button to showcase your comprehensive work history.</li>
            </ul>
          </div>
        </div>


        <div className='panel blue flex flex-col md:flex-row py-16 md:py-40 px-4 md:px-16 gap-5  bg-green-500'>
          <div className='animate-on-scroll' data-animation="animate__lightSpeedInRight">
            <img className='h-auto max-w-[100%]' src="education.png" alt="Education Details Form" />
          </div>
          <div className='py-4 mx-10 md:py-8 animate-on-scroll' data-animation="animate__lightSpeedInLeft">
            <h1 className="font-bold text-lg md:text-xl text-blue-800">Step 5: Education Details</h1>
            <ul className='text-gray-200 text-sm md:text-base'>        
              <li>Document your educational background by filling in:
                <ul>
                  <li>University Name</li>
                  <li>Degree</li>
                  <li>Major</li>
                  <li>Start & End Dates</li>
                  <li>Education Summary: Summarize your academic achievements.</li>
                </ul>
              </li>
              <li>Include multiple educational entries with the "Add More Education" button, highlighting all your academic milestones.</li>
            </ul>
          </div>
        </div>


        <div className='panel blue flex flex-col md:flex-row py-16 md:py-40 px-4 md:px-16 gap-5  bg-teal-400'>
          <div className='animate-on-scroll' data-animation="animate__jackInTheBox">
            <img className='h-auto max-w-[100%]' src="skills.png" alt="Skills Details Form" />
          </div>
          <div className='py-4 mx-10 md:py-8 animate-on-scroll' data-animation="animate__rollIn">
            <h1 className="font-bold text-lg md:text-xl text-blue-800">Step 6: Skills Section</h1>
            <ul className='text-gray-200 text-sm md:text-base'>      
              <li>Showcase your top skills by listing them out:
                <ul>
                  <li>Skill Name</li>
                  <li>Skill Rating: Use star ratings to indicate your proficiency level.</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>


        <div className='panel blue flex flex-col md:flex-row py-16 md:py-40 px-4 md:px-16 gap-5  bg-rose-500'>
          <div className='animate-on-scroll' data-animation="animate__zoomInLeft">
            <img className='h-auto max-w-[100%]' src="completed-resume.png" alt="Complete resume" />
          </div>
          <div className='py-4 mx-10 md:py-8 animate-on-scroll' data-animation="animate__zoomInRight">
            <h1 className="font-bold text-lg md:text-xl text-blue-800">Step 7: Output Resume</h1>
            <ul className='text-gray-200 text-sm md:text-base'>         
              <li>Congratulations! Your AI-powered resume is now complete and ready to make an impact.</li>
              <li>View your full resume in its final form to ensure every detail is perfect.</li>
              <li>Download your resume, or share it directly as a link or via email to potential employers or colleagues.</li>
            </ul>
          </div>
        </div>
    </div> 
  );
}


export default StepsGuide