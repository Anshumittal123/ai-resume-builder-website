import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfo';
import GlobalAPI from '../../../../../../../../../Services/GlobalAPI';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const formField={
  name: '',
  rating: 0,
}

function Skills({enableNext}) {
  const [skillsList, setSkillsList] = useState([formField]);
  const [loading, setLoading] = useState(false);
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const params = useParams();
  
  useEffect(() => {
      if (resumeInfo?.Skills && skillsList.length === 1 && skillsList[0] === formField) {
          setSkillsList(resumeInfo.Skills);
      }
  }, [resumeInfo]);

  const handleChange = (index, name, value)=>{
    const newEntries = [...skillsList];
      newEntries[index][name] = value;
      setSkillsList(newEntries);
      // Ensure the preview updates with this change
      setResumeInfo(prev => ({ ...prev, Skills: newEntries }));
  }

  // const AddNewSkill = ()=>{
  //   setSkillsList([...skillsList, {
  //     name: '',
  //     rating: 0,
  //   }]);
  // }

    const AddNewSkill = ()=>{
      const updatedList = [...skillsList, { ...formField }];
        setSkillsList(updatedList);
        // Ensure the preview updates with this change
        setResumeInfo(prev => ({ ...prev, Skills: updatedList }));
    }

  const RemoveSkill = ()=>{
    const updatedList = skillsList.length > 1 ? skillsList.slice(0, -1) : skillsList;
        setSkillsList(updatedList);
        // Ensure the preview updates with this change
        setResumeInfo(prev => ({ ...prev, Skills: updatedList }));
  }

  const onSave=()=>{
    setLoading(true);

    const data={
      data: {
        Skills: skillsList.map(({id, ...rest})=> rest),
      }
    }

    GlobalAPI.UpdateResumeDetail(params?.resumeId, data).then(resp=>{
      console.log(resp);
      enableNext(true);
      setLoading(false);
      toast("Skills Details Updated!");
    }, (error)=>{
      setLoading(false);
      toast("Server error please try again!");
      console.error("Error:", error);
    });
  }

  useEffect(()=>{
    if (resumeInfo?.skills !== skillsList) {
      setResumeInfo((prev) => ({ ...prev, skills: skillsList }));
  }
  }, [skillsList])
  

  return (
    <div>
       <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10 rounded-lg'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key Skills</p>

        <div>
          {skillsList.map((item,index) =>(
            <div key={index} className='flex justify-between gap-2 border rounded-lg p-3 my-3'>
              <div>
                <label className='text-xs' htmlFor="name">Name</label>
                <Input className="w-full" value={item?.name || ''} name="name" onChange={(e)=>handleChange(index, 'name', e.target.value)}/>
              </div>
              <Rating style={{ maxWidth: 120 }}  value={item.rating|| ''} onChange={(v)=>handleChange(index, 'rating', v)} />
            </div>
          ))}
        </div>
        <div className='flex justify-center md:justify-between lg:justify-between flex-wrap gap-2 mx-4 my-4'>
            <div className='flex gap-2'>
            <Button variant="outline" className="text-primary text-xs md:text-sm lg:text-sm" onClick={AddNewSkill}> + Add More Skills</Button>
            <Button variant="outline" className="text-primary text-xs md:text-sm lg:text-sm" onClick={RemoveSkill}> - Remove</Button>
            </div >
            <Button onClick={()=>onSave()} disabled={loading}>
                        {loading?<LoaderCircle className='animate-spin'/>:"Save"}
                </Button>
          </div>
      </div>
    </div>
  )
}

export default Skills
