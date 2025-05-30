import { Delete, DownloadCloud, Edit, LoaderCircle, MoreVertical, Notebook, View } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalAPI from '../../../../Services/GlobalAPI'
import { toast } from 'sonner'


function ResumeCardItem({resume, refreshData}) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete=()=>{
    setLoading(true)
    GlobalAPI.DeleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume Deleted!');
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }, (error)=>{
      setLoading(false);
      toast('Unable to delete your resume. Please try again!');
      console.log('error', error);
    })
  }
  return (
    <div>
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
        <div className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center h-[150px] md:h-[280px] lg:h-[280px] border-solid rounded-t-md hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer border-t-red-400 border-t-4'>
            {/* <Notebook/> */}
            <img className='h-[80px] w-[90px] md:h-auto lg:h-auto md:max-w-[100%] lg:max-w-[100%]' src="cv.png" alt="image" />
        </div>   
    </Link>
    <div className='border p-3 flex justify-between text-white bg-red-400 rounded-b-lg'>
      <h2 className='text-center my-1'>{resume.title}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-pointer'/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.documentId+'/edit')} className="flex gap-3 cursor-pointer"><Edit/> Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')} className="flex gap-3 cursor-pointer"><View/> View</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')} className="flex gap-3 cursor-pointer"><DownloadCloud/> Download</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setOpenAlert(true)} className="flex gap-3 cursor-pointer"><Delete/> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undo. This will permanently delete your resume
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>:"Delete"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
    </div>
  )
}

export default ResumeCardItem
