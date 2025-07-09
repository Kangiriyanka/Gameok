
import './App.css'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './context/AuthContext';
import { router } from './routes/routes';

function App() {
 

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
