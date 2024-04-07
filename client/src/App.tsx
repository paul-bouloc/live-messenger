import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/login/login'
import Register from './pages/auth/register/register'
import Profile from './pages/profile/profile'
import AppLayout from './components/layouts/appLayout'
import Home from './pages/home/home'
import ErrorPage from './pages/error/error'
import AuthLayout from './components/layouts/authLayout'
import AuthProvider from './context/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/toaster'
import RoomPage from './pages/room/room'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: 'room/:roomId',
          element: <RoomPage/>
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
      errorElement: <ErrorPage/>,
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
