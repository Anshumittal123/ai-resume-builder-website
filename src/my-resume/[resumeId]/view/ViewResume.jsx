import ResumePreview from '@/Pages/Dashboard/components/resume/[resumeId]/edit/components/ResumePreview'
import Header from '@/components/Custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfo'
import GlobalAPI from '../../../../Services/GlobalAPI'
import { Download, Share2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import ReactConfetti from 'react-confetti'


function ViewResume() {
    const [resumeInfo, SetResumeInfo] = useState();
    const {resumeId} = useParams();

    useEffect(()=>{
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () =>{
        GlobalAPI.GetResumeId(resumeId).then(resp=>{
            console.log(resp.data.data);
            SetResumeInfo(resp.data.data);
        })
    }

    const handleDownload=()=>{
        window.print();
    }

    const hasWindow = typeof window !== 'undefined';
    const height = hasWindow? window.innerHeight:null;
    const width = hasWindow? window.innerWidth : null;
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, SetResumeInfo}}>
    <div id='no-print'>
    <ReactConfetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={2000}
    />
      <Header/>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36 overflow-auto'>
        <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate AI generates Resume is ready.</h2>
        <p className='text-center text-gray-400'>Now you are ready to download your resume and  you can share unique resume url with your friends and family.</p>
        <div className='flex justify-center lg:justify-between md:justify-between gap-5 md:px-44 lg:px-44 my-10'>
            <Button className="flex gap-3" onClick={handleDownload}> <Download/> Download</Button>
            <RWebShare
                data={{
                text: "Hello Everyone, This is my resume please open url to see it.",
                url: import.meta.env.VITE_BASE_URL+'/my-resume/'+resumeId+'/view',
                title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
                }}
                onClick={() => console.log("shared successfully!")}>
            <Button className="flex gap-3"> <Share2/> Share</Button>
            </RWebShare>
        </div>
        </div>  
      </div>
      <div id='print-area' className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <ResumePreview/>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
