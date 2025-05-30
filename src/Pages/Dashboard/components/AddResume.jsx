import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import GlobalAPI from '../../../../Services/GlobalAPI';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState();
    const {user} = useUser();
    const [Loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const onCreate=()=>{
        setLoading(true);
        const uuid = uuidv4();
        const data ={
            data:{
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
            }
        }
        GlobalAPI.createNewResume(data).then(resp=>{
            console.log(resp.data.data.documentId);
            if(resp){
                setLoading(false);
                navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit'); // updated uuid to documentId
                setOpenDialog(false); // Close the dialog after creation
            }
        }, (error)=>{
            setLoading(false);
        });
    }

  return (
    <div>
      <div 
        className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[150px] md:h-[280px] lg:h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' 
        onClick={()=>setOpenDialog(true)}> 
         <PlusSquare/>
      </div>   
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Resume</DialogTitle>
              <DialogDescription>
                <p>Add a title for your new resume</p>
                <Input className='my-2' placeholder='Ex. Full Stack Resume' onChange={(e)=>setResumeTitle(e.target.value)}/>
              </DialogDescription>
                <div className='flex justify-end gap-5'>
                    <Button variant='ghost' className='border' onClick={()=>setOpenDialog(false)}>Cancel</Button>
                    <Button 
                        disabled={!resumeTitle || Loading}
                        onClick={onCreate}>
                        {Loading ? <Loader2 className='animate-spin'/> : "Create"}
                    </Button>
                </div>
            </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume;
