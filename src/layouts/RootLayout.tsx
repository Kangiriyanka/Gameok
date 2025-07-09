
import Header from '../general/Header.tsx';
import { Outlet } from "react-router-dom";


export default function RootLayout() {

    return (
        <div className ="App">
        <Header/>
        <Outlet/>
        </div>

    )


}