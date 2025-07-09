

import {  useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import "./Header.css"




function Header() {

  const navigate= useNavigate();
  const {token, removeToken, storedUserInfo} = useAuthContext();

 async function logOut() {
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Call the prop function to remove token and redirect
    removeToken();
    navigate("/login");

  }   catch (error) {
    console.error("Fetch error:", error);
  }
}

    return (
     

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Gameok</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   
    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
      {/*  Games Dropdown */ }
      {token ? (
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Games
          </a>
          
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
          <li><a className="dropdown-item" href="/my_games">My Games</a></li>
          {storedUserInfo =="Kangiriyanka" ? (<li><a className="dropdown-item"  href="/add_games">Add Games (Admin)</a></li>) : ""}
          <li><a className="dropdown-item"  href="/user_add_games">Add Games </a></li>
           
            
          </ul>
        </li>
      </ul>
      ): ""}
      
      

      {/*  Consoles */ }
      {token ? (
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Consoles
          </a>
          
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a className="dropdown-item" href="/consoles">My Consoles</a></li>
            {/* Only show the add console route if the user is the admin */}
            {storedUserInfo == "Kangiriyanka" ?  (<li><a className="dropdown-item" href="/add_consoles">Add Consoles</a></li>)  : ""}
            
          </ul>
        </li>
      </ul>
      ): ""}
      
      {/* {User Info } */}
     
      {token ? (
      <ul className="navbar-nav right-hs-dropdown">
        <li className="nav-item dropdown user_info">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="username-decoration">{storedUserInfo}</span>
          </a>
          
          <ul className="dropdown-menu dropdown-menu-dark " aria-labelledby="navbarDarkDropdownMenuLink">
          <li className="nav-item dropdown">
          <li><a className="dropdown-item"  href="/edit_password"> Change Password</a></li>
          </li>
          <li ><button className="btn btn-dark dropdown-item" onClick={logOut}> Logout </button> </li>
        
           
            
          </ul>
        </li>
      </ul>
      
      ): ""}
      </div>
   
   
  </div>
 
  
</nav>
      
   
    
    )
  }


export default Header;