import React, { useState } from 'react'
import PersonalDetails from './Forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summary from './Forms/Summary';
import Experience from './Forms/Experience';
import Education from './Forms/Education';
import Skills from './Forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ViewResume from '@/my-resume/[resumeId]/view/ViewResume';
import ThemeColor from './ThemeColor';

function FormSection() {
  const [activeFormIndex, setActiveFromIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const {resumeId} = useParams();
  return (
    <div>
      <div className='flex flex-wrap justify-center gap-2 md:justify-between lg:justify-between items-center'>
        <div  className='flex gap-5'>
          <Link to={'/'}>
        <Button><Home/></Button></Link>
        <ThemeColor/>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex>1
          && 
          <Button size="sm" className="flex gap-2" onClick={()=>setActiveFromIndex(activeFormIndex - 1)} > <ArrowLeft/> </Button>}
          <Button disabled={!enableNext} className="flex gap-2" size="sm" onClick={()=> setActiveFromIndex(activeFormIndex + 1)} > Next <ArrowRight/> </Button>
        </div>
      </div>
      {/* Personal Details */}
        {activeFormIndex == 1? <PersonalDetails enableNext={(v)=> setEnableNext(v)}/> : activeFormIndex == 2? <Summary  enableNext={(v)=> setEnableNext(v)}/> : activeFormIndex == 3? <Experience  enableNext={(v)=> setEnableNext(v)}/> :  activeFormIndex == 4? <Education  enableNext={(v)=> setEnableNext(v)}/> :activeFormIndex == 5? <Skills  enableNext={(v)=> setEnableNext(v)}/> : activeFormIndex == 6? <Navigate to={'/my-resume/'+resumeId+'/view'}/> : null}

      {/* Experience */}

      {/* Educational Details */}

      {/* Skills */}

    </div>
  )
}

export default FormSection
