

import { useAuthContext } from "../context/AuthContext";
import AnimationWrapper from "../animation_components/AnimationWrapper";


export default function Home() {

    const {storedUserInfo} = useAuthContext()
   
  

    

    return (


        <AnimationWrapper>
        <div className="flex flex-col">
        <div className="page-header">
           <h1> {storedUserInfo}'s Memories</h1>
           
        </div>      

       
           
        </div>
        </AnimationWrapper>
   
    
        
    )
}


     
