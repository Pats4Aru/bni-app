import "../Visitors.css";
import { Navbar } from "../Components/Navbar.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export const Visitors = () => {
 
    const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3002" : "https://bni-web-app.onrender.com"
    const [visitors, setVisitors] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/visitor-search`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                searchWord: searchKeyword
            })
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((visitorData) => {
            setVisitors(visitorData.visitorQueryResult)
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
                        <tr class="active-row" key={visitor.id}>
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

