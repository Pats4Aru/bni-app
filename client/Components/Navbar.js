import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const pages = ["Members", "Visitors", "Add a Visitor"];
 
    return (
       <div class="navbar">
          <img src="https://www.bni.com/wp-content/uploads/2020/04/BNI-Refresh.jpg" class="BNI"/>
          <ul class="pageList">
          {pages.map((page) =>
             <li><Link to={`/${page === "Add a Visitor" ? "AddVisitors" : page}`} 
                        class="pageLink">{page}
                  </Link>
             </li>
          )}
          <button onClick={() => window.location.href = "/"} class="logout-button" style={{color:"black", width:"85px", height:"35px", backgroundColor:"#FF003F"}}>
            Logout
          </button>
          </ul>
       </div>
    )
}