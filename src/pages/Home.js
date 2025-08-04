
import "../Home.css";
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {useState, useEffect} from "react";
import {Button, TextField} from "@mui/material";
import {auth} from "../firebase/firebase_setup.js";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const Home = () => {

  const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3002" : "https://bni-web-app.onrender.com"
  const [allMembers, setAllMembers] = useState([]);
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null)
  const [otp, setOtp] = useState("");

  console.log(`${API_BASE_URL}` + "/members")

  useEffect(() => {
        fetch(`${API_BASE_URL}/members`)
           .then((response) => {
              return response.json(); 
           })
           .then((data) => {
              setAllMembers(data);
           })
           .catch(err => console.log(err))
     }, []);

  const verifyPhone = () => {
      for (let i = 0; i < allMembers.length; i++) {
        const currentMember = allMembers[i];
        const currentMemberPhone = currentMember["Phone"].trim();
        const newFormatPhone = process.env.NODE_ENV == "development" ? phone.substring(2).trim() : phone.substring(3).trim();
        console.log(currentMemberPhone + "\n" + newFormatPhone)
        if (currentMemberPhone === newFormatPhone) {
          return true; // phone number is valid
        }
      }
      alert("You are not a member of BNI. Please contact a BNI member to join.");
      return false; // phone number not valid
  }

  const sendOTP = () => {
      // only allow them to log in if they are a actual member in our database
      if (verifyPhone()) {
        window.RecaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {})  
        const appVerifier = window.RecaptchaVerifier;
        console.log(phone);
          signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
            }).catch((error) => {
              console.log("Error, code coudn't be sent to phone. Try Again.");
            })
      }
  }

  const verifyOTP = () => {
      confirmationResult.confirm(otp).then((result) => {
         setUser(result.user);
         window.location.href = "/Members"
      }).catch((error) => {
         alert("Invalid OTP code")
      })
  }

  return (
    <div className="phone-signin">
      <img className="bni-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvM6JotQjcAnKS8XQsmxjnROcXQ7dztGPRoQ&s"/>
      <div className="phone-content">
        <PhoneInput placeholder="Enter your phone number" value={phone} onChange={setPhone}/>
        <Button onClick={sendOTP} sx={{marginTop:"10px", marginLeft:"40px"}} variant="contained" size="medium">SEND SMS TOKEN</Button>
        <div style={{marginTop:"10px"}} id="recaptcha"></div>
        <br/>
        <TextField onChange={(e) => setOtp(e.target.value)} sx={{marginTop:"10px", width:"300px", marginLeft:"40px"}} variant="outlined" size="small" label="Enter token"/>
        <br/>
        <Button onClick={verifyOTP} sx={{marginTop:"10px", marginLeft:"40px"}} variant="contained" color="success">Verify Token</Button>
      </div>
    </div>
  )
}

