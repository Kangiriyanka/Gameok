
import Register from "../authentication_components/Register.tsx";
import EmptyView from "../authentication_components/EmptyView.tsx";
import Login from "../authentication_components/Login.tsx"
import Auth from "../authentication_components/Auth.tsx";



// Users who are logged in  should not log in or register again.
export const publicRoutes = [
  {
        path: "/",
        Component: Auth,
        children: [ 
  
       
        {index: true, 
        Component: Login
      },
      
  
      {
        path: "register",
        Component: Register
      },
       
    
    ],
  },

     {
        path: "*",
        Component: EmptyView
      } 
  ]
    
  

