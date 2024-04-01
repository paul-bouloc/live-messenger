import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/login/login'
import Register from './pages/auth/register/register'
import Room from './pages/room/room'
import Profile from './pages/profile/profile'
import AppLayout from './components/layouts/appLayout'
import Home from './pages/home/home'
import NotFound from './pages/404/notFound'
import AuthLayout from './components/layouts/authLayout'
import AuthProvider from './context/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/toaster'

const queryClient = new QueryClient()

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout/>,
      errorElement: <NotFound/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: 'room/:id',
          element: <Room/>
        },
        {
          path: 'profile',
          element: <Profile/>
        },
      ]
    },
    {
      path: 'auth',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children: [
        {
          path: 'register',
          element: <Register/>
        },
        {
          path: '',
          element: <Login/>
        }
      ]
    },
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default App
