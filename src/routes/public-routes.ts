import Login from "../authentication_components/Login.tsx";
import Register from "../authentication_components/Register.tsx";
import RootLayout from "../layouts/RootLayout.tsx";



export const publicRoutes = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true, 
        Component: Login
},
      {
        path: "register",
        Component: Register
      }
    ]
  }
];