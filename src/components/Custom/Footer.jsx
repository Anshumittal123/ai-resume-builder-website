import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='py-32 mx-16'>
      <div className='flex justify-center gap-10 flex-wrap'>
        <Link className='hover:text-orange-500 hover:font-bold' to={'/'}><p>Home</p></Link>
        <Link className='hover:text-orange-500 hover:font-bold' to={'/dashboard'}><p>DashBoard</p></Link>
        <Link className='hover:text-orange-500 hover:font-bold'><p>Privacy Policy</p></Link>
        <Link className='hover:text-orange-500 hover:font-bold'><p>Terms of Service</p></Link>
      </div>

      <div className='flex justify-center gap-5 py-10'>
        <a href="https://www.linkedin.com/in/anshu-mittal-77388522b/"><i className="fa-brands fa-linkedin fa-fade fa-xl"></i></a>
        <a href="https://github.com/Anshumittal123"><i className="fa-brands fa-github fa-fade fa-xl"></i></a>
        <a href="https://myportfolioanshu.netlify.app/"><i className="fa-solid fa-briefcase fa-fade fa-xl"></i></a>
        <a href="https://x.com/AnshuMittal2004"><i className="fa-brands fa-x-twitter fa-fade fa-xl"></i></a>
      </div>
      <hr />
      <p className='py-5 text-center text-gray-400 text-sm'><i className="fa-solid fa-copyright fa-bounce"></i> 2024 AI Resume Builder by <a className='hover:text-orange-500 hover:font-bold' href="https://myportfolioanshu.netlify.app/">Anshu Mittal</a>. All rights reserved.</p>
    </div>
  )
}

export default Footer
