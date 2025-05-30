import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfo';
import dummy from '@/Pages/Data/dummy';
import GlobalAPI from '../../../../../../../Services/GlobalAPI';


function EditResume() {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState();

    useEffect(()=>{
      // setResumeInfo(dummy);
        // console.log(params.resumeId);
        GetResumeInfo();
    }, []);

    const GetResumeInfo= () =>{
      GlobalAPI.GetResumeId(params.resumeId).then(resp=>{
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
      })
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
    <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
      {/* FormSection */}
      <FormSection/>

      {/* PreviewSection */}
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
