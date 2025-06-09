import React, { useRef, useState } from 'react'
import Header from '@/components/Custom/Header'
import '../../../src/App.css'
import { LoaderCircle, SendIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';


const CareerForm = () => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const [candidateData, setCandidateData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        designation: "",
        experience: "",
        currentSalary: "",
        expectedSalary: "",
        education: "",
        address: "",
        resume: [],
    });

    const changeHandle = (e) =>{
        setCandidateData({...candidateData, [e.target.name]: e.target.value });
    }

    const handlerSubmitCandidateDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          const formData = new FormData();
          formData.append("files", candidateData.resume);
          formData.append(
            "data",
            JSON.stringify({
              firstName: candidateData.firstName,
              lastName: candidateData.lastName,
              email: candidateData.email,
              phoneNo: parseInt(candidateData.phone),
              designation: candidateData.designation,
              experience: parseInt(candidateData.experience),
              currentSalary: parseInt(candidateData.currentSalary),
              expectedSalary: parseInt(candidateData.expectedSalary),
              education: candidateData.education,
              address: candidateData.address,
            })
          );

          console.log(`form data store at database: ${formData}`)
      
          const res = await fetch("http://localhost:1337/api/career-details", {
            method: "POST",
            body: formData,
          });

          console.log(`api response: ${res}`)
      
          if (!res.ok) {
            console.error(await res.text()); 
            throw new Error("Failed to submit");
          }
      
          toast.success("Details stored successfully!");
        } catch (error) {
          console.error("Submit error:", error);
          toast.error("Unable to store data");
        } finally {
          setLoading(false);
          setCandidateData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            designation: "",
            experience: "",
            currentSalary: "",
            expectedSalary: "",
            education: "",
            address: "",
            resume: [],
          });
          inputRef.current.value = null;
        }
      };
      
      
  return (
    <>
        <Header />
        <div className='flex flex-row items-center justify-center bg-gradient-to-r from-blue-100 to-cyan-100 border max-w-full max-h-ful'>
            <div className='m-[1%] w-[33rem] border bg-gray-50 rounded-xl shadow-lg'>
                <div className='border border-gray-200 rounded-xl'>
                    <div className='flex flex-row items-center bg-gray-200 justify-center gap-[18%] rounded-t-xl'>
                        <div className='items-start'>
                            <img src="/paramount-Logo.png" alt="Paramount-Logo" />
                        </div>
                        <div>
                            <h1 id="job-title" className="text-xl">Career Application Form</h1>
                        </div>
                    </div>
                    
                <form onSubmit={handlerSubmitCandidateDetails} className='items-center justify-center m-3'> 
                    <div className='ml-[4%]'>
                        <div className='flex flex-row gap-[25%] flex-wrap'>
                            <div className='flex-col'>
                                <label>First Name: </label>
                                <div>
                                    <input className='border text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1' name='firstName' required onChange={changeHandle} value={candidateData.firstName} type="text"   placeholder='example'/>
                                </div>
                            </div>
                            <div className='flex-col'>
                                <label>Last Name: </label>
                                <div>
                                    <input className='border text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1' name='lastName' required onChange={changeHandle} value={candidateData.lastName} type="text"  placeholder='example'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 ml-[4%] bold'>
                        <div className='flex  flex-row gap-[25%] flex-wrap'>
                            <div className='flex-col'>
                                <label>Email: </label>
                                <div>
                                    <input className='border text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1' name='email' required onChange={changeHandle} value={candidateData.email} type="email" placeholder='example@gmail.com' />
                                </div>
                            </div>
                            <div className='flex-col'>
                                <label>Phone No: </label>
                                <div>
                                    <input className='border text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1' name='phone' required onChange={changeHandle} value={candidateData.phone} type="tel" placeholder='0000-00-00-00' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 ml-[4%] bold'>
                        <div className='flex flex-row gap-[18%] flex-wrap'>
                            <div className='flex-col'>
                                <label>Designation: </label>   
                                <div> 
                                    <select name="designation" required className="w-[80%] text-sm max-h-10 focus:outline-gray-500 overflow-auto p-1 border border-gray-500 rounded" value={candidateData.designation} onChange={changeHandle}>
                                        <option className='border text-sm border-gray-500 focus:outline-gray-500 rounded-sm ' disabled hidden value="">Your Designation</option>
                                        <option value={"Software Developer"}>Software Developer</option>
                                        <option value={"Automation Test Engineer"}>Automation Test Engineer</option>
                                        <option value={"IT Head"}>IT Head</option>
                                        <option value={"IT Manager"}>IT Manager</option>
                                        <option value={"AEP Engineer"}>AEP Engineer</option>
                                        <option value={"Dispatch Executive"}>Dispatch Executive</option>
                                        <option value={"Shipping Head"}>Shipping Head</option>
                                        <option value={"Assistant Merchant"}>Assistant Merchant</option>
                                        <option value={"Junior Buyer"}>Junior Buyer</option>
                                        <option value={"Sales Executive"}>Sales Executive</option>
                                        <option value={"Finance Officer"}>Finance Officer</option>
                                        <option value={"Internal Auditor"}>Internal Auditor</option>
                                        <option value={"Accountant"}>Accountant</option>
                                        <option value={"Print Designer"}>Print Designer</option>
                                        <option value={"Quality Assurance Manager"}>Quality Assurance Manager</option>
                                        <option value={"HR"}>HR</option>
                                        <option value={"Compliance Professional"}>Compliance Professional</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex-col'>
                                <label>Experience: </label>
                                <div>
                                    <input className='border text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1' name='experience' type="number" value={candidateData.experience} onChange={changeHandle} placeholder='0' min={0}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 ml-[4%] bold'>
                        <div className='flex flex-row gap-[25%] flex-wrap'>
                            <div className='flex-col'>
                                <label>Current Salary: </label>
                                <div>
                                    <input className='border text-sm border-gray-500 rounded-sm focus:outline-gray-500 p-1' name='currentSalary' value={candidateData.currentSalary} onChange={changeHandle} type="tel" placeholder='0'/>
                                </div>
                            </div>
                            <div className='flex-col'>
                                <label>Expected Salary: </label>
                                <div>
                                    <input className='border text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1' name='expectedSalary' value={candidateData.expectedSalary} onChange={changeHandle} type="tel" placeholder='0'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 ml-[4%] bold'>
                        <div className='flex-col'>
                            <label>Education: </label>
                            <div>
                                <input className='border w-[96%] text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1' name='education' required value={candidateData.education} onChange={changeHandle} type="text" placeholder='BTech'/>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 ml-[4%] bold'>
                        <div className='flex-col'>
                            <label>Address: </label>
                            <div>
                                <textarea className='border w-[96%] text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1' name="address" cols="30" rows="4" onChange={changeHandle} value={candidateData.address} placeholder='A-55, Block A, Okhla Phase II, New Delhi, 110020'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 ml-[4%] bold'>
                        <div className='flex-col '>
                            <label>Resume Upload: </label>
                            <div className='cursor-pointer'>
                                <input className='border w-[96%] text-sm border-gray-500 focus:outline-gray-500 rounded-sm p-1 bg-white' ref={inputRef} type="file" name="file" placeholder="No File Chosen"
                                onChange={(e) =>setCandidateData({
                                  ...candidateData,
                                  resume: e.target.files[0],
                                })} />
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex items-center justify-center mt-4'>
                    <Button className='gap-2 shadow-md border hover:bg-white hover:border-blue-800 hover:text-blue-800' type='submit' disabled={loading}>
                      {loading ? (<LoaderCircle className="animate-spin" /> ) : (<><SendIcon /> Submit</>)}
                    </Button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default CareerForm
