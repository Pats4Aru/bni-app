import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const pages = ["Members", "Visitors"];
 
    return (
       <div class="navbar">
          <img src="https://www.bni.com/wp-content/uploads/2020/04/BNI-Refresh.jpg" class="BNI"/>
          <ul class="pageList">
          {pages.map((page) =>
             <li><Link to={`/${page}`} class="pageLink">{page}</Link></li>
          )}
          <button onClick={() => window.location.href = "/"} style={{color:"black", marginLeft:"750px", width:"85px", height:"35px", backgroundColor:"#FF003F"}}>
            Logout
          </button>
          </ul>
       </div>
    )
}