import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{color:resumeInfo?.themeColor}}>Professional Experience</h2>
      <hr className='border-[1.5px]' style={{borderColor: resumeInfo?.themeColor}}/>

      {resumeInfo?.Experience?.map((experience, index)=>(
        <div key={index} className='my-5'>
            <h2 className=' text-sm font-bold' style={{color:resumeInfo?.themeColor}}>{experience?.title}</h2>
            <h2 className='text-xs flex justify-between'>{experience?.companyName}, {experience?.city}, {experience?.state} <span>{experience?.startDate} To {experience?.currentWorking?"present": experience?.endDate}</span></h2> 
            {/* <p className='text-xs my-2'>
                {experience?.workSummary}
            </p> */}
           <div 
            className='text-xs my-2' 
            dangerouslySetInnerHTML={{
              __html: typeof experience?.workSummary === 'string'
                ? experience.workSummary.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '')
                : '' // fallback to an empty string if workSummary is not a string
            }}>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview
