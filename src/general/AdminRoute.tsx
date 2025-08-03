import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import Sidebar from "./Sidebar.tsx"
import AnimationWrapper from "@/animation_components/AnimationWrapper.tsx";



export default function AdminRoute() {


    const isAdmin = useLoaderData()
 

  
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
    <div id= "layout">
      <Sidebar isAdmin ={isAdmin}/>
        <main>
            <AnimationWrapper>
                <Outlet/>
            </AnimationWrapper>
        </main>
    </div>
        
    );
}