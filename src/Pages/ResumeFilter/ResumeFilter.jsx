import Header from "@/components/Custom/Header";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
// import {mammoth} from "mammoth";
// import {pdfParse} from "pdf-parse";


function ResumeFilter(){
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [AllResumeData, setAllResumeData] = useState([]);

    const MatchResume = async (keyword) => {
      console.log(keyword);
      const res = await fetch('http://localhost:1337/api/filter-resumes', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      });
    
      if (!res.ok) throw new Error("Request failed");
    
      return res.json(); 
    };

    const fetchAllResume = async() =>{
      try {
        const res = await axios.get('http://localhost:1337/api/user-resume/get-all-resumes');
        // console.log(`Resume from backend: ${res.data.AllResume}`); 
        setAllResumeData(res.data.AllResume || []);
        // console.log(`All Resume Data: ${AllResumeData}`);
      } catch (error) {
        console.error("Error Resume Fatch:", error);
      }
    }
     
    useEffect(()=>{
      fetchAllResume();
    }, []);

    let data;
    const convertDataToJson = (files) =>{
      if(files.endsWith('.pdf')){
        data = files;
        console.log(`PDF Data: ${data}`);
      }else if(files.endsWith('.docx')){
        data = files;
        console.log(`Docx Data: ${data}`);
      }else{
        console.log(`Unsupported file format for: ${files}`);
      }
    }
    

    const onSave = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await MatchResume(keyword);
        setResults(res.matchedResumes || []);
      } catch (error) {
        console.error("Error filtering resumes:", error);
        alert("Failed to filter resumes");
      }
      setLoading(false);
    };

    return(
        <>
        <div>
            <Header/>
            <div className="flex justify-center items-end flex-col mx-3 mt-3">
                {/* <h2 className="font-semibold">Filter Resumes</h2> */}
                <div className="flex flex-row">
                    <input className="border border-black outline-<20>px mr-1 rounded-md p-1" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter Filter word..." />
                    <Button onClick={(e)=>onSave(e)} disabled={loading}>
                        {loading?<LoaderCircle className='animate-spin'/>:"Search"}
                    </Button>
                </div>
            </div>

            <div className="px-4 pb-4">
                    <h3 className="font-bold mb-2">Matched Resumes:</h3>
                    {results.length === 0 && !loading && <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                          <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg shadow-md">
                            <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr className="bg-gray-500 text-white hover:bg-gray-700">
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Name</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Email</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Contact No.</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Designation</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Salary</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Experience</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">education</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Address</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Resume</th>
                              </tr>
                            </thead>
                            {AllResumeData.map((file, idx) => (
                              <tbody>
                                <tr key={idx}  className="odd:bg-white cursor-pointer even:bg-gray-100 hover:bg-gray-100">
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">Example</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">example2004@gmail.com</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">1234567890</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">Test Developer</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">20000</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">2 Year</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">BTech</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">L-12 Block-D New Delhi</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">
                                      <a className="hover:text-blue-500 hover:underline" href={file} target="_blank" rel="noopener noreferrer">Resume View</a>
                                  </td>
                                </tr>
                              </tbody>  
                            ))} 
                            </table>
                            </div>
                          </div>
                        </div>
                      </div>}
                      {results.length != 0 && !loading && <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                          <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg shadow-md">
                            <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr className="bg-gray-500 text-white hover:bg-gray-700">
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Name</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Email</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Contact No.</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Designation</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Salary</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Experience</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">education</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Address</th>
                                <th className="px-1 py-1 text-start text-xs font-medium uppercase">Resume</th>
                              </tr>
                            </thead>
                            {results.map((file, idx) => (
                              <tbody>
                                <tr key={idx} className="odd:bg-white cursor-pointer even:bg-gray-100 hover:bg-gray-100">
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">Example</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">example2004@gmail.com</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">1234567890</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">Software Developer</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">20000</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">2 Year</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">BTech</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">L-1 Block-B New Delhi</td>
                                  <td className="px-1 py-1 text-sm font-medium text-gray-800">
                                      <a className="hover:text-blue-500 hover:underline" href={file} target="_blank" rel="noopener noreferrer">Resume View</a>
                                      {convertDataToJson(file)}
                                  </td>
                                </tr>
                              </tbody>  
                            ))} 
                            </table>
                            </div>
                          </div>
                        </div>
                      </div>}
                </div>
        </div>
        </>
    );
}

export default ResumeFilter;