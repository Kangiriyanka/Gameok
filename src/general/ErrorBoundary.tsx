import { useRouteError, isRouteErrorResponse, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ErrorBoundary() {
  const error = useRouteError();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {

    if (isRouteErrorResponse(error) && (error.status === 401 || error.status === 422)) {

      setShouldRedirect(true);
    }
  }, [error]);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }



  return <p style ={{}}className= "">Unexpected error occurred.</p>;
}