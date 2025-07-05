
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router= {router} />
  </StrictMode>,
)


