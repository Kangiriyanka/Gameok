
import Register from "../authentication_components/Register.tsx";
import RootLayout from "../layouts/RootLayout.tsx";



export const publicRoutes = [
  {
    path: "/",
    Component: RootLayout,
    children: [
  
      {
        path: "register",
        Component: Register
      }
    ]
  }
];