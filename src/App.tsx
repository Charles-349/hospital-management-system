import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import AboutPage from './pages/AboutPage'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyUser from './pages/VerifyUser'
import { Toaster } from 'sonner'




function App() {
 
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/about',
      element: <AboutPage />
    },
     {
      path: '/register',
      element: <Register/>,
    },
     {
      path: '/login',
      element: <Login />,
    },
     {
      path: '/register/verify',
      element: <VerifyUser />,
    },
    
  ])


  

  return (
    <>
      <RouterProvider router={router} />
       <Toaster position='top-right' toastOptions={{
        classNames: {
          error: 'bg-red-500 text-white',
          success: 'bg-green-500 text-white',
          info: 'bg-blue-500 text-white',
        }

      }} />
    
    </>
  )
}

export default App