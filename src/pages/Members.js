
import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar.js";
import { useState, useEffect, useRef } from "react"; 

export const Members = () => {
    return (
       <div>
         <MembersTable/> 
         <Navbar /> 
       </div>
    )
}

function MembersTable() {  

   console.log("Members Table component is mounting")

   const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3002" : "https://bni-web-app.onrender.com"
   const [currentMembers, setCurrentMembers] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [startPage, setStartPage] = useState(1);
   const [totalEntries, setTotalEntries] = useState(109);
   const [searchKeyword, setSearchKeyword] = useState("");
   const entriesPerPage = 10;
   const [numPages, setNumPages] = useState(Math.ceil(totalEntries / entriesPerPage));
   const [endPage, setEndPage] = useState(startPage + 5);
   const currentPageInterval = [];
   const prevSearchKeyword = useRef("");

   for (let i = startPage; i < endPage; i++) {
      currentPageInterval.push(i);
   }

   const lookAheadOnePage = () => {
      if (endPage <= numPages) {
         setEndPage(endPage + 1);
         setStartPage(startPage + 1);
      }
   }

   const lookBackOnePage = () => {
      if (startPage > 1) {
         setEndPage(endPage - 1);
         setStartPage(startPage - 1);
      }
   }

   const updateCurrentPage = (clickedPage) => {
      setCurrentPage(clickedPage)
   }

   useEffect(() => {
      fetch(`${API_BASE_URL}/members`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
         {
            pageNumber: currentPage,
            searchTerm: searchKeyword,
         }),
      })
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         console.log(data);
         setCurrentMembers(data.memberQueryResult);
         setTotalEntries(data.numEntries);
         const newNumPages = Math.ceil(data.numEntries / entriesPerPage);
         setNumPages(newNumPages);

         if (prevSearchKeyword.current != searchKeyword) {
            setCurrentPage(1);
            setStartPage(1);
            setEndPage(newNumPages < 5 ? newNumPages + 1 : 6);
            prevSearchKeyword.current = searchKeyword;
         }
      })
      .catch(err => console.log(err))
   }, [currentPage, searchKeyword]);

   return  (
         <div>
            <input type="search" placeholder="Search Member by Name" class="member-search" 
            onChange={(event) => setSearchKeyword(event.target.value)}>
            </input>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Profession</th>
                     <th>Company</th>
                  </tr>
               </thead>
               <tbody>
                  {currentMembers.map((user) =>
                        <tr class="active-row" key={user.id}>
                           <td>
                              <Link className="userLink" to="/Members/user" state={user} >
                              {user.Name}
                              </Link>
                           </td>
                           <td>{user.Profession}</td>
                           <td>{user.Company}</td>
                        </tr>
                  )}
               </tbody>
            </table>
            <div class="pagination">
               <a onClick={lookBackOnePage}>prev</a>
               {currentPageInterval.map((page) => 
                  <a key={page} onClick={() => {updateCurrentPage(page)}} class={currentPage === page ? "active" : ""}>{page}</a>
               )}
               <a onClick={lookAheadOnePage}>next</a>
            </div>
         </div>
      )
   }

export default MembersTable;