
import Header from '../general/Header.tsx';
import Sidebar from "../general/Sidebar.tsx"
import Login from "../authentication_components/Login.tsx"
import { useAuthContext } from '../context/AuthContext.tsx';
import { Outlet } from "react-router-dom";


export default function RootLayout() {
    const {token} = useAuthContext() 
    return (
        <div className ="App">
        <Sidebar/>
        {/* {token?  <Outlet/> : <Login/>} */}
    
        
        </div>

    )


}