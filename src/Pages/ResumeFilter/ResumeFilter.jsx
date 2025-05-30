import Header from "@/components/Custom/Header";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";


function ResumeFilter(){
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

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
            <div className="flex justify-center items-center flex-col m-8">
                <h2 className="font-semibold">Filter Resumes</h2>
                <div className="flex flex-row">
                    <input className="border border-black outline-<20>px mr-1 rounded-md p-1" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter Filter word..." />
                    <Button onClick={(e)=>onSave(e)} disabled={loading}>
                        {loading?<LoaderCircle className='animate-spin'/>:"Search"}
                    </Button>
                </div>
            </div>

            <div className="p-4">
                    <h3 className="font-bold mb-2">Matched Resumes:</h3>
                    {results.length === 0 && !loading && <p>No resumes matched.</p>}
                    <ul className="list-disc list-inside">
                        {results.map((file, idx) => (
                            <li key={idx}>
                                <a className="text-blue-600 underline" href={file} target="_blank" rel="noopener noreferrer">{file}</a>
                            </li>
                        ))} 
                    </ul>
                </div>
        </div>
        </>
    );
}

export default ResumeFilter;