import { useLoaderData } from "react-router"


export default function Home() {
    let data = useLoaderData();
    

    return (
        <div >
           
           <h1> Welcome {data.storedUserInfo}</h1>
           
           
        </div>
    )
}


     
