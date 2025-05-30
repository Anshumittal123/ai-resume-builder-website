import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfo';
import { AIChatSession } from '../../../../../../../../Services/AIModal';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnUnderline, BtnUndo, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner';

// const prompt = 'position title: {positionTitle}, Depends on position title give me 3 to 4 bullet points for mr experience in resume, give me a result in JSON format.';
const prompt = 'Based on the position title "{positionTitle}", provide 3 to 4 bullet points summarizing relevant experience. Ensure the output is a JSON array of strings.';
function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
    const [value, setValue] = useState(defaultValue);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummaryFromAI=async(e)=>{
        // setLoading(true);
        // if(!resumeInfo.experience[index].title){
        //     toast('Please Add Position Title.');
        //     return ;
        // }
        // const PROMPT = prompt.replace('{positionTitle}', resumeInfo.experience[index].title);
        // const result = await AIChatSession.sendMessage(PROMPT);
        // const responseText = await result.response.text();
        // console.log("Raw response:", responseText);
        // setValue(responseText.replace('[', '').replace(']', ''));
        // toast('Summary Generate from AI successfully.');
        // setLoading(false);
        
        e.preventDefault();
        setLoading(true);
        if (!resumeInfo.experience[index].title) {
            toast('Please Add Position Title.');
            return;
        }

        const PROMPT = prompt.replace('{positionTitle}', resumeInfo.experience[index].title);
        const result = await AIChatSession.sendMessage(PROMPT);
        const responseText = await result.response.text();

        try {
            const parsedResponse = JSON.parse(responseText);
            setValue(parsedResponse.join("\n"));
            toast('Summary generated successfully.');
        } catch (error) {
            toast('Failed to parse AI response. Please try again.');
            console.error('Parsing error:', error);
        }

        setLoading(false);
    }
  return (
    <div>
         <div className='flex justify-center gap-4 md:justify-between lg:justify-between my-4'>
            <label className='text-xs flex items-end'>Summary</label>
            <Button variant="outline" onClick={GenerateSummaryFromAI} size="sm" className='flex gap-2 text-primary border-primary'>
                {loading? <LoaderCircle className='animate-spin'/> : <><Brain className='h-4 w-4'/> Generate From AI</>}
            </Button>
        </div>

      <EditorProvider>
        <Editor value={value} onChange={(e)=>{
            setValue(e.target.value);
            onRichTextEditorChange({ target: { value: e.target.value } }, 'workSummary', index);
        }}>
            <Toolbar>
                <BtnUndo />
                <BtnRedo />
                <Separator/>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
            </Toolbar>

        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
