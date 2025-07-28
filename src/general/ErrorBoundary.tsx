import { useRouteError, isRouteErrorResponse, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function ErrorBoundary() {
  const error = useRouteError();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const {setUserInfo} = useAuthContext()

  useEffect(() => {

    if (isRouteErrorResponse(error) && (error.status === 401 || error.status === 422)) {
    
      localStorage.removeItem("username");
      setUserInfo("")
      setShouldRedirect(true);
     
    }
  }, [error]);

  if (shouldRedirect) {
 
    return <Navigate to="/" replace />;
  }


  
  return <h1 className= "p-3">Unexpected error occurred  :(. <br/>Your session could have  expired. </h1>;
}