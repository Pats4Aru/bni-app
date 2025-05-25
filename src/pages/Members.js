import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar.js";
import { useState, useEffect } from "react"; 

export const Members = () => {
    return (
       <div>
          <MembersTable/>
          <h1 class="meetText">Meet the Members!</h1>
          <Navbar />
       </div>
    )
}


function MembersTable() {  

   const [currentMembers, setCurrentMembers] = useState([]);

   useEffect(() => {
      fetch('http://localhost:3002/members')
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            setCurrentMembers(data);
         })
         .catch(err => console.log(err))
   }, []);

   return  (
         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Occupation</th>
                  <th>Company</th>
               </tr>
            </thead>
            <tbody>
               {currentMembers.map((user) =>
                     <tr class="active-row">
                        <td key={user.id}>
                           <Link class="userLink" to="/Members/user" state={user} >
                           {user.Name}
                           </Link>
                        </td>
                        <td>{user.Occupation}</td>
                        <td>{user.Company}</td>
                     </tr>
                )}
            </tbody>
         </table>
      )
   }

