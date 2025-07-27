


import { useAuthContext } from '../context/AuthContext.tsx';
import { Navigate, Outlet } from "react-router-dom";
import AnimationWrapper from '@/animation_components/AnimationWrapper.tsx';

export default function Auth() {
    const {storedUserInfo} = useAuthContext() 

    if (storedUserInfo) 
        return <Navigate to="/dashboard/home" replace />;
   


    return (
    <AnimationWrapper>
    <Outlet/>
    </AnimationWrapper>
    )
}