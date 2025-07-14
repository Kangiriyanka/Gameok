import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {

  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return <p>Your session expired. Please log in again.</p>;
    }
    return <p>Error: {error.status} {error.statusText}</p>;
  }

  return <p>Unexpected error occurred.</p>;
}