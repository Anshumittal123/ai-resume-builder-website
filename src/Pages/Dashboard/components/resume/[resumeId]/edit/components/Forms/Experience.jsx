import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfo';
import { useParams } from 'react-router-dom';
import GlobalAPI from '../../../../../../../../../Services/GlobalAPI';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
}

function Experience({enableNext}) {
    const [experienceList, setExperienceList] = useState([formField]);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    useEffect(() => {
        if (resumeInfo?.Experience && experienceList.length === 1 && experienceList[0] === formField) {
            setExperienceList(resumeInfo.Experience);
        }
    }, [resumeInfo]);

    const handleChange = (index, event) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
        // Ensure the preview updates with this change
        setResumeInfo(prev => ({ ...prev, Experience: newEntries }));
    };

    const AddNewExperience = () => {
        const updatedList = [...experienceList, { ...formField }];
        setExperienceList(updatedList);
        // Ensure the preview updates with this change
        setResumeInfo(prev => ({ ...prev, Experience: updatedList }));
    };

    const RemoveExperience = () => {
        const updatedList = experienceList.length > 1 ? experienceList.slice(0, -1) : experienceList;
        setExperienceList(updatedList);
        // Ensure the preview updates with this change
        setResumeInfo(prev => ({ ...prev, Experience: updatedList }));
    };

    const handleRichTextEditor = (value, name, index) => {
        const newEntries = [...experienceList];
        // newEntries[index][name] = value;
        newEntries[index][name] = typeof value === 'object' && value.target ? value.target.value : value;
        setExperienceList(newEntries);
        // Ensure the preview updates with this change
        setResumeInfo(prev => ({ ...prev, Experience: newEntries }));
    };

    const onSave = ()=>{
      // e.preventDefault();
      setLoading(true);

      const data={
        data: {
          Experience: experienceList.map(({id, ...rest})=> rest),
        }
      }

      GlobalAPI.UpdateResumeDetail(params?.resumeId, data).then(resp=>{
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Experience Details Updated");
      }, (error)=>{
        setLoading(false);
        toast("Server error please try again!");
        console.error("Error:", error);
      });
    }

    useEffect(() => {
        if (resumeInfo?.experience !== experienceList) {
            // setResumeInfo({
            //     ...resumeInfo,
            //     experience: experienceList,
            // });
            setResumeInfo((prev) => ({ ...prev, experience: experienceList }));
        }
    }, [experienceList]);
    
  return (
    <div>
       <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10 rounded-lg'>
      <h2 className='font-bold text-lg'>Professional Experience</h2>
      <p>Add Your previous Job experience.</p>

      <div>
        {experienceList.map((item, index)=>(
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div>
                <label className='text-xs' htmlFor="positionTitle">Position Title</label>
                <Input name="title" value={item?.title || ''} onChange={(event)=>handleChange(index,event)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="companyName">Company Name</label>
                <Input name="companyName"  value={item?.companyName || ''} onChange={(event)=>handleChange(index,event)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="city">City</label>
                <Input name="city" value={item?.city || ''} onChange={(event)=>handleChange(index,event)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="state">State</label>
                <Input name="state" value={item?.state || ''} onChange={(event)=>handleChange(index,event)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="startDate">Start Date</label>
                <Input type="date" value={item?.startDate || ''} name="startDate" onChange={(event)=>handleChange(index,event)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="endDate">End Date</label>
                <Input type="date" value={item?.endDate || ''} name="endDate" onChange={(event)=>handleChange(index,event)}/>
              </div>
              <div className='col-span-2'>
                {/* Work Summary */}
                <RichTextEditor index={index}  defaultValue={item?.workSummary} onRichTextEditorChange={(event)=>handleRichTextEditor(event, 'workSummary', index)}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center md:justify-between lg:justify-between flex-wrap gap-2 mx-4 my-4'>
        <div className='flex gap-2'>
        <Button variant="outline" className="text-primary text-xs md:text-sm lg:text-sm" onClick={AddNewExperience}> + Add More Experience</Button>
        <Button variant="outline" className="text-primary text-xs md:text-sm lg:text-sm" onClick={RemoveExperience}> - Remove</Button>
        </div >
        <Button onClick={()=>onSave()} disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin'/>:"Save"}
            </Button>
      </div>
    </div>
    </div>
  )
}

export default Experience
   