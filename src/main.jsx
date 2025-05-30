import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './Pages/Auth/SignInPage.jsx'
import Home from './Pages/Home/Home.jsx'
import DashBoard from './Pages/Dashboard/DashBoard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './Pages/Dashboard/components/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/ViewResume.jsx'
import ResumeFilter from './Pages/ResumeFilter/ResumeFilter.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: '/dashboard',
        element: <DashBoard/>
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume/>
      }
    ]
  },
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage/>
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume/>
  },
  {
    path: '/resume-filter',
    element: <ResumeFilter/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider  router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
