
import './App.css'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './context/AuthContext';
import { router } from './routes/routes';
import { ConsoleProvider } from './context/ConsoleContext';


function App() {
 

  return (
    <>
      <AuthProvider>
        <ConsoleProvider>
        <RouterProvider router={router} />
        </ConsoleProvider>
        
      </AuthProvider>
    </>
  )
}

export default App
