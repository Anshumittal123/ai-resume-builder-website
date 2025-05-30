import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfo';
import GlobalAPI from '../../../../../../../../../Services/GlobalAPI';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const formField ={
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  description: '',
}

function Education({enableNext}) {
  const [educationalList, setEducationalList] = useState([formField]);
  const [loading, setLoading] = useState();
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const params = useParams();

  useEffect(() => {
      if (resumeInfo?.Education && educationalList.length === 1 && educationalList[0] === formField) {
          setEducationalList(resumeInfo.Education);
      }
  }, [resumeInfo]);

  const handleChange = (index, event)=>{
    const newEntries = educationalList.slice();
      const {name , value} = event.target;
      newEntries[index][name] = value;
      setEducationalList(newEntries);
      setResumeInfo(prev => ({ ...prev, Education: newEntries }));
  }

  const AddNewEducation=()=>{
    const updatedList = [...educationalList, { ...formField }];
        setEducationalList(updatedList);
        // Ensure the preview updates with this change
        setResumeInfo(prev => ({ ...prev, Education: updatedList }));
  }

  const RemoveEducation=()=>{
    const updatedList = educationalList.length > 1 ? educationalList.slice(0, -1) : educationalList;
    setEducationalList(updatedList);
    // Ensure the preview updates with this change
    setResumeInfo(prev => ({ ...prev, Education: updatedList }));
  }

  const onSave=()=>{
    setLoading(true);

      const data={
        data: {
          Education: educationalList.map(({id, ...rest})=> rest),
        }
      }

      GlobalAPI.UpdateResumeDetail(params?.resumeId, data).then(resp=>{
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Education Details Updated");
      }, (error)=>{
        setLoading(false);
        toast("Server error please try again!");
        console.error("Error:", error);
      });
  }

  useEffect(()=>{
      if (resumeInfo?.education !== educationalList) {
        setResumeInfo((prev) => ({ ...prev, education: educationalList }));
    }
    }, [educationalList]);
    
  return (
    <div>
      <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10 rounded-lg'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add your education details</p>


      <div>
        {educationalList.map((item, index)=>(
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label className='text-xs' htmlFor="universityName">University Name</label>
                <Input name="universityName" value={item?.universityName || ''} onChange={(e)=>handleChange(index, e)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="degree">Degree</label>
                <Input name="degree" value={item?.degree || ''} onChange={(e)=>handleChange(index, e)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="major">Major</label>
                <Input name="major" value={item?.major || ''} onChange={(e)=>handleChange(index, e)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="startDate">Start Date</label>
                <Input type="date" value={item?.startDate || ''} name="startDate" onChange={(e)=>handleChange(index, e)}/>
              </div>
              <div>
                <label className='text-xs' htmlFor="endDate">End Date</label>
                <Input type="date" value={item?.endDate || ''} name="endDate" onChange={(e)=>handleChange(index, e)}/>
              </div>
              <div className='col-span-2'>
                <label className='text-xs' htmlFor="description">Description</label>
                <Textarea  name="description" value={item?.description || ''} onChange={(e)=>handleChange(index, e)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center md:justify-between lg:justify-between flex-wrap gap-2 mx-4 my-4'>
            <div className='flex gap-2'>
            <Button variant="outline" className="text-primary text-xs md:text-sm lg:text-sm" onClick={AddNewEducation}> + Add More Education</Button>
            <Button variant="outline" className="text-primary text-xs md:text-sm lg:text-sm" onClick={RemoveEducation}> - Remove</Button>
            </div >
            <Button onClick={()=>onSave()} disabled={loading}>
                        {loading?<LoaderCircle className='animate-spin'/>:"Save"}
                </Button>
          </div>
      </div>
    </div>
  )
}

export default Education
