import "../Visitors.css";
import { Navbar } from "../Components/Navbar.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export const Visitors = () => {
 
    const [visitors, setVisitors] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        fetch('http://localhost:3002/visitor-search', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                searchWord: searchKeyword
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((visitorData) => {
            console.log(visitorData);
            setVisitors(visitorData)
        })
        .catch(err => console.log(err))
    }, [searchKeyword])
    
    return (
        <div>
            <input placeholder="Search Visitor by Name" class="visitor-search" 
            onChange={(event) => setSearchKeyword(event.target.value)}>
            </input>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Referrer</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map((visitor) => 
                        <tr class="active-row">
                            <td key={visitor.id}>
                                <Link class="userLink" to="/Visitors/user" state={visitor}>
                                {visitor.Name}
                                </Link>
                            </td>
                            <td>{visitor.Company}</td>
                            <td>{visitor.Referrer}</td>
                        </tr>
                    )}
               </tbody>
            </table>
            <Navbar />
        </div>
    )
}

