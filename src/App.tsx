import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import AboutPage from './pages/AboutPage'
import LandingPage from './pages/LandingPage'




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
    
  ])


  

  return (
    <>
      <RouterProvider router={router} />
    
    </>
  )
}

export default App