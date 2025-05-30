import { ResumeInfoContext } from '@/context/ResumeInfo'
import React, { useContext, useState } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';


function ResumePreview() {
  const {resumeInfo, SetResumeInfo} = useContext(ResumeInfoContext);


  return (
    <div className="shadow-lg p-14 h-full border-t-[20px]" style={{borderColor: resumeInfo?.themeColor}}>
      {/* personal Detail */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
      {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo}/>
      {/* Professional Experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>
      {/* Educational */}
        <EducationalPreview resumeInfo={resumeInfo}/>
      {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
