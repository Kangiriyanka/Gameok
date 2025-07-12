

import { useAuthContext } from "../context/AuthContext";


export default function Home() {

    const {storedUserInfo} = useAuthContext()
   
  

    

    return (
        <div className="flex flex-col">
        <div className="page-header">
           <h1> {storedUserInfo}'s Memories</h1>
           
        </div>      

       
           
        </div>
    )
}


     
