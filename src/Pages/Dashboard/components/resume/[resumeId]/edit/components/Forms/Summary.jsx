import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfo'
import GlobalAPI from '../../../../../../../../../Services/GlobalAPI';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from '../../../../../../../../../Services/AIModal';

const prompt = 'Job Title: {jobTitle}. depends on job title give me a summary from my resume within 3 to 4 lines in JSON format with field Experience Level and Summary with Experience Level for Fresher, Mid-level and Experienced.';
function Summary({enableNext}) {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAIGeneratedSummaryList] = useState();

    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary: summary,
        })
    }, [summary]);

    const GenerateSummaryFromAI = async() =>{
        setLoading(true);
      try {
          const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
          console.log(PROMPT);
          const result = await AIChatSession.sendMessage(PROMPT);
          const responseText = await result.response.text();
          console.log("Raw response:", responseText);
        //   const wrappedResponse = `[${responseText}]`;
        //   console.log("Wrapped response:", wrappedResponse);
          setAIGeneratedSummaryList(JSON.parse(responseText));
      } catch (error) {
        console.error("AI response error:", err);
        toast("Failed to generate summary");
      }
        setLoading(false);
    }

    const onSave = (e)=>{
        e.preventDefault();
        setLoading(true);

        const data ={
            data:{
                summary: summary,
            }
        };
        GlobalAPI.UpdateResumeDetail(params?.resumeId, data).then(resp=>{
            console.log(resp);
            enableNext(true);
            setLoading(false);
            toast("Summary Updated");
        }, (error)=>{
            setLoading(false);
        });
    }

  return (
    <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10 rounded-lg'>
      <h2 className='font-bold text-lg'>Summery</h2>
      <p>Add Summary for your job title.</p>

      <div className='mt-7'>
        <div className='flex justify-between items-end'>
            <label htmlFor="addsummary">Add Summary</label>
            <Button variant="outline" size="sm" onClick={()=>GenerateSummaryFromAI()} type="button" className="border-primary text-primary flex gap-2"> <Brain className='h-4 w-4'/> {loading?<LoaderCircle className='animate-spin'/>: 'Generate From AI'}</Button>   
        </div>
        <Textarea className="mt-5" defaultValue={resumeInfo?.summary || ''} required onChange={(e)=>setSummary(e.target.value)}/>
        <div className='flex justify-end mt-2'>
            <Button onClick={(e)=>onSave(e)} disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin'/>:"Save"}
            </Button>
        </div>
      </div>

      {aiGeneratedSummaryList&& <div>
        <h2 className='font-bold text-lg'>Suggestions</h2>
        {aiGeneratedSummaryList.ExperienceLevels?.map((item, index)=>(
            <div key={index}>
                <h2 className='font-bold my-1'>Level: {item.ExperienceLevel}</h2>
                {console.log(item.Summary)}
                <p>{item?.Summary}</p> 
            </div>
        ))}
      </div>}
    </div>
  )
}

export default Summary
