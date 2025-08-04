import React from "react";
import { Navbar } from "../Components/Navbar.js"
import { Camera } from "react-camera-pro"
import { useRef, useState, useEffect, useCallback } from "react"
import { createWorker } from "tesseract.js"
import "../AddVisitor.css"

const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3002" : "https://bni-web-app.onrender.com"

export const AddVisitors = () => {

   const cameraRef = useRef(null)
   const [image, setImage] = useState("")
   const [toggleImageVerify, setToggleImageVerify] = useState(false)
   const [showWebcam, setShowWebcam] = useState(true)
   const [formToggle, setFormToggle] = useState(false)

   const capture = useCallback(() => {
      const img = cameraRef.current.takePhoto()
      setImage(img)
      setShowWebcam(false)
      setToggleImageVerify(true)
   }, [cameraRef])

   const resetToggle = () => {
      setToggleImageVerify(false)
      setShowWebcam(true)
      setFormToggle(false)
   }

   const showForm = () => {
     setShowWebcam(false)
     setToggleImageVerify(false)
     setFormToggle(true)
   }

   const ValidateImage = () => {
      return (
         <div class="popup-border">
            <div class="popup-content">
               <h2 id="image-verify">Is this the image you want to use?</h2>
               <img src={image} id="photo-image"/>        
               <button onClick={resetToggle} class="no-button">No</button>  
               <button class="yes-button" onClick={showForm}>Yes</button>  
            </div>
         </div>
      )
   }

   return (
        <div>
            {showWebcam ? 
               <div class="camera-container">
                  <Camera
                  ref={cameraRef}
                  screenshotFormat="image/jpeg"
                  facingMode="environment"
                  />
                 <button id="take-photo-button" onClick={capture}>Take Photo</button>
               </div>
               : <></>}
            {toggleImageVerify ? <ValidateImage/> : <></>}
            {formToggle ? <GenerateForm imgURL={image} resetToWebcam={resetToggle}/> 
             : <></>}
            <Navbar/>
        </div>
   )
}

const GenerateForm = ({resetToWebcam, imgURL}) => {
   
   useEffect(() => {
      const getFieldData = async () => {
         const textData = await processImageData(imgURL)
         setName(textData.name)
         setCompany(textData.company)
         setPhone(textData.phone)
         setEmail(textData.email)
      }
      
      getFieldData()
   }, [])

   const [name, setName] = useState("");
   const [company, setCompany] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [referrer, setReferrer] = useState("")

   const sendFormData = async () => {
      await fetch(`${API_BASE_URL}/visitors`, {
         method: 'POST',
         headers: {
            'Content-Type': "application/json"
         },
         body: JSON.stringify({
            Name: name,
            Company: company,
            Email: email,
            Phone: phone,
            Referrer: referrer,
         }),
      });
      
      resetToWebcam();
   }
   
   return (
         <div class="form-container">
            <div class="form-title">Verify Visitor</div>
               <div class="inputs">
                  <label>Name:</label>
                  <input type="text" required class="form-input" value={name} onChange={(e) => {setName(e.target.value)}}></input><br/>
                  <label>Company:</label>
                  <input type="text" required class="form-input" value={company} onChange={(e) => {setCompany(e.target.value)}}></input><br/>
                  <label>Email:</label>
                  <input type="text" required class="form-input" value={email} onChange={(e) => {setEmail(e.target.value)}}></input><br/>
                  <label>Phone:</label>
                  <input type="text" required class="form-input" value={phone} onChange={(e) => {setPhone(e.target.value)}}></input><br/>
                  <label>Referrer:</label>
                  <input type="text" required class="form-input" value={referrer} onChange={(e) => {setReferrer(e.target.value)}}></input><br/>
                  <button class="form-button" onClick={sendFormData}>Submit</button>
               </div>
         </div>
   )
}

const processImageData = async (url) => {
   const worker = await createWorker({})
   
   const processWorker = async () => {
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {data: { text } } = await worker.recognize(url);
      const relevantData = await parseOCRText(text);
      const relevantDataTokens = relevantData.split(",")
      const visitorDataObject = {
         name: relevantDataTokens[0], 
         company: relevantDataTokens[1], 
         phone: relevantDataTokens[2],
         email: relevantDataTokens[3],
      }
      await worker.terminate();
      console.log(visitorDataObject)
      return visitorDataObject
   }

   return processWorker();
}

const parseOCRText = async (ocrText) => {
   const relevantTextResponse = await fetch(`${API_BASE_URL}/gpt`, {
      method: 'POST',
      headers: {
         'Content-Type': "application/json"
      },
      body : JSON.stringify({
         prompt: ocrText,
      }),
   })

   const extractedText = await relevantTextResponse.json();
   return extractedText
}



