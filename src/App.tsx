import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import AboutPage from './pages/AboutPage'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyUser from './pages/VerifyUser'
import { Toaster } from 'sonner'
import AdminDashboard from './dashboard/AdminDashboard/AdminDashboard'
import UserDashboard from './dashboard/UserDashboard/UserDashboard'
import DoctorDashboard from './dashboard/DoctorDashboard/DoctorDashboard'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import Users from './dashboard/AdminDashboard/manageUsers/Users'
import Profile from './dashboard/Profile'
import ContactPage from './pages/ContactPage'
import Appointments from './dashboard/AdminDashboard/apppointments/Appointments'
import Payments from './dashboard/AdminDashboard/payments/Payments'
import Complaints from './dashboard/AdminDashboard/complaints/Complaints'
import Prescriptions from './dashboard/AdminDashboard/prescription/Prescription'





function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin');
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'user');
  const isDoctor = useSelector((state: RootState) => state.user.user?.role === 'doctor');
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
      path: '/contact',
      element: <ContactPage/>,
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
      path: '/user/dashboard',
      element:isUser ? <UserDashboard /> : <Login />,
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
          path: 'profile',
          element: <Profile/>
        },
        {
          path: 'analytics',
          element: <h1>Analytics</h1>
        },
      ]
    },

    {
      path: '/admin/dashboard',
      element: isAdmin ? <AdminDashboard /> : <Login />,
      children: [
       
         {
          path: 'appointments',
          element: <Appointments/>
        },
        
          {
          path: 'payments',
          element: <Payments/>
        },

          {
          path: 'prescriptions',
          element: <Prescriptions/>
        },
         {
          path: 'complaints',
          element: <Complaints/>
        },
           {
          path: 'users',
          element: <Users/>
        },
         {
          path: 'profile',
          element: <Profile/>
        },
        {
          path: 'analytics',
          element: <h1>Analytics</h1>
        },
      ]
    },

    {
      path: '/doctor/dashboard',
      element:isDoctor ? <DoctorDashboard /> : <Login />,
      children: [
       
         {
          path: 'appointments',
          element: <h1>Appointments</h1>
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
          path: 'profile',
          element: <Profile/>
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