import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './pages/Home.js';
import { Visitors } from "./pages/Visitors.js";
import { Members } from "./pages/Members.js";
import { User } from "./pages/User.js";
import { AddVisitors } from "./pages/AddVisitors.js";

function App() {

   return (
      <Router>
         <Routes>
            <Route path="/Members" element={<Members/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/Visitors" element={<Visitors/>}/>
            <Route path="/Members/user" element={<User/>}/>
            <Route path="/Visitors/user" element={<User/>}/>
            <Route path="/AddVisitors" element={<AddVisitors/>}/>
         </Routes>
      </Router>
   )
   
}

export default App