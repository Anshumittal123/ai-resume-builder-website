import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfo';
import { useParams } from 'react-router-dom';
import GlobalAPI from '../../../../../../../../Services/GlobalAPI';
import { toast } from 'sonner';
  

function ThemeColor() {
    const colors =[
        "#FF5733", "#33FF57","#3357FF", "#FF33A1", "#33FFA1", 
        "#FF7133", "#71FF33", "#7133FF", "#33FF71", "#3371FF", 
        "#A1FF33", "#33A1FF", "#5733FF", "#33FF5A", "#5A33FF", 
        "#FF335A", "#A133FF", "#FF3371", "#FF5733", "#335AFF",
    ];

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const {resumeId} = useParams();

    const onClickSelect = (color)=>{
        setSelectedColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color,
        });

        const data ={
            data: {
                themeColor: color
            }
        }
        GlobalAPI.UpdateResumeDetail(resumeId, data).then(resp=>{
            console.log(resp);
            toast('Theme Color Updated!');
        })
    }
  return (
    <Popover>
    <PopoverTrigger asChild><Button variant='outline' size="sm" className="flex gap-2"> <LayoutGrid/> Theme</Button></PopoverTrigger>
    <PopoverContent>
        <h2 className='font-medium mb-2 text-sm'>Select Theme Color</h2>
        <div className='grid grid-cols-5 gap-3'>
            {colors.map((item, index)=>(
                <div key={index}>
                    <div onClick={()=>onClickSelect(item)} className={`h-5 w-5 rounded-full cursor-pointer hover:border-black borde ${selectedColor == item&&'border border-black'}`} style={{background: item}}>
                    </div>
                </div>
            ))}
        </div>
    </PopoverContent>
    </Popover>
  )
}

export default ThemeColor
