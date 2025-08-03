import { useAuthContext } from "../context/AuthContext";
import {useRef} from "react"
import {useNavigate, Link} from "react-router-dom"
import "../assets/styles/sidebar.css"
import { fetchWithCSRF } from "../assets/scripts/csrf";


type SidebarProps = {
  isAdmin: string
}

export default function Sidebar( {isAdmin}: SidebarProps) {
    const {setUserInfo, storedUserInfo} = useAuthContext()
    const sidebarRef = useRef<HTMLElement>(null)
    const toggleBtnRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate()

  async function logOut() {
  try {
    const response = await fetchWithCSRF("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    localStorage.removeItem("username")
    setUserInfo("")
    navigate("/")

  }  catch (error) {
    console.error("Fetch error:", error);
  }
}



    // The next element to the button is the ul
    // The ul gets a show class applied to it if the button is clicked.
    function toggleSubMenu(button: HTMLButtonElement) {
     if (!sidebarRef.current || !toggleBtnRef.current) return; 

     if(!button.nextElementSibling?.classList.contains('show')) {
     closeAllSubmenus()
     }
    if (button.nextElementSibling) {
    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if (sidebarRef.current.classList.contains('close')) {
            sidebarRef.current.classList.toggle('close')
            toggleBtnRef.current.classList.toggle('rotate')
        }

    
   
    }
}

    function toggleSidebar() {
        if (!sidebarRef.current || !toggleBtnRef.current) return; 

      
        sidebarRef.current.classList.toggle('close');
        toggleBtnRef.current.classList.toggle('rotate');

        closeAllSubmenus()
      


     }


     function closeAllSubmenus() {
         if (!sidebarRef.current)  return; 

          Array.from(sidebarRef.current.getElementsByClassName('show'))
        .forEach(ul => {ul.classList.remove('show')
                if (ul.previousElementSibling) ul.previousElementSibling.classList.remove('rotate')

        })
        

     }



  
    return (
        <div className="h-[105%] bg-[var(--n64-dark-gray-clr)] relative">
        <nav ref={sidebarRef} id="sidebar">

        <ul>
        
        {/* Toggle-btn opens and closes the sidebar */}
        <li> 
            <span className="logo">Gameok</span>
            <button ref= {toggleBtnRef} onClick={() => toggleSidebar()} id= "toggle-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg>

            </button>
        </li>

        <li className="active" > 
            <Link to ="/dashboard/home">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
            <span >Home</span>
            </Link>
           
        </li>

        

        {/* Consoles Dropdown */}
          <li>
            <button onClick= {(e) => toggleSubMenu(e.currentTarget)} className="dropdown-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M627-520h133v-160H627v160Zm-214 0h133v-160H413v160Zm-213 0h133v-160H200v160Zm0 240h133v-160H200v160Zm213 0h133v-160H413v160Zm214 0h133v-160H627v160Zm-507 0v-400q0-33 23.5-56.5T200-760h560q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H200q-33 0-56.5-23.5T120-280Z"/></svg> 
                <span>Consoles</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>

            </button>
            <ul className= "sub-menu">
                <div>
               <Link to="/dashboard/consoles/">My Consoles</Link>
                {isAdmin ? <li> <Link to= "/admin/add-consoles">Add Console (Admin)</Link></li>: ""}
                </div>
            </ul>
           
          </li>
        <li>
            <button onClick= {(e) => toggleSubMenu(e.currentTarget)}className="dropdown-btn"> 
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-654Zm174 174Zm-348 0Zm174 174Zm0-234L360-660v-220h240v220L480-540Zm180 180L540-480l120-120h220v240H660Zm-580 0v-240h220l120 120-120 120H80ZM360-80v-220l120-120 120 120v220H360Zm120-574 40-40v-106h-80v106l40 40ZM160-440h106l40-40-40-40H160v80Zm280 280h80v-106l-40-40-40 40v106Zm254-280h106v-80H694l-40 40 40 40Z"/></svg>
                <span>Games</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>

            </button>
            <ul className="sub-menu">
                <div>
                <li><Link to="/dashboard/games/my-games">My Games</Link></li>
                <li><Link to="/dashboard/games/add-games/">Add Games</Link></li>
                {isAdmin ? <li> <Link to= "/admin/add-games">Add Games (Admin)</Link></li>: ""}
                </div>
            </ul>
           
        </li>

        <li> 
            <button onClick= {(e) => toggleSubMenu(e.currentTarget)}className="dropdown-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
            <span className="">{storedUserInfo} </span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>

            </button>

            <ul className= "sub-menu">
            <div>
             <li><Link to="/dashboard/edit-password">Change Password</Link></li>
            <li> <button className="dropdown-btn" style={{paddingLeft: "2em"}} onClick={logOut}>Logout </button> </li>
            </div>
            </ul>


        </li>

        
        </ul>
        
        
        </nav>
        </div>







    );

}