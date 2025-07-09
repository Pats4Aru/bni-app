import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from '../client/pages/Home.js';
import { Visitors } from "../client/pages/Visitors.js";
import { Members } from "../client/pages/Members.js";
import { User } from "../client/pages/User.js";
import { AddVisitors } from "../client/pages/AddVisitors.js";

function App() {

   return (
      <Router>
         <Routes>
            <Route path="https://bni-web-app.onrender.com/Members" element={<Members/>}/>
            <Route path="https://bni-web-app.onrender.com" element={<Home/>}/>
            <Route path="https://bni-web-app.onrender.com/Visitors" element={<Visitors/>}/>
            <Route path="https://bni-web-app.onrender.com/Members/user" element={<User/>}/>
            <Route path="https://bni-web-app.onrender.com/Visitors/user" element={<User/>}/>
            <Route path="https://bni-web-app.onrender.com/AddVisitors" element={<AddVisitors/>}/>
         </Routes>
      </Router>
   )
   
}

export default App