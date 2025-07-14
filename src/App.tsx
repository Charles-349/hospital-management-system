import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import AboutPage from './pages/AboutPage'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyUser from './pages/VerifyUser'
import { Toaster } from 'sonner'
import AdminDashboard from './dashboard/AdminDashboard/AdminDashboard'




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
    {
      path: '/admin/dashboard',
      element:<AdminDashboard /> ,
      children: [
       
         {
          path: 'appointments',
          element: <h1>Appointments</h1>
        },
        
          {
          path: 'payments',
          element: <h1>Payments</h1>
        },

          {
          path: 'prescriptions',
          element: <h1>Prescriptions</h1>
        },
         {
          path: 'complaints',
          element: <h1>Complaints</h1>
        },
           {
          path: 'users',
          element: <h1>Users</h1>
        },
         {
          path: 'profile',
          element: <h1>Profile</h1>
        },
        {
          path: 'analytics',
          element: <h1>Analytics</h1>
        },
      ]
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