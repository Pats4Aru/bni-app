import React from "react";
import { Navbar } from "../Components/Navbar.js"
import Webcam from "react-webcam"
import { useRef, useState } from "react"
import { createWorker } from "tesseract.js"
import "../AddVisitor.css"

export const AddVisitors = () => {

   const webcamRef = useRef(null)
   const [image, setImage] = useState("")
   const [toggleImageVerify, setToggleImageVerify] = useState(false)
   const [showWebcam, setShowWebcam] = useState(true)
   const [formToggle, setFormToggle] = useState(false)

   const capture = React.useCallback(() => {
      const img = webcamRef.current.getScreenshot()
      setImage(img)
      setShowWebcam(false)
      setToggleImageVerify(true)
   }, [webcamRef])

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
               <div>
                 <Webcam
                  ref={webcamRef}
                  height={450}
                  screenshotFormat="image/jpeg"
                  width={1050}
                  class="webcam"
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

   // const textData = processImageData(imgURL)
   const [name, setName] = useState("Name");
   const [company, setCompany] = useState("Company");
   const [email, setEmail] = useState("Email");
   const [phone, setPhone] = useState("Phone");
   const [referrer, setReferrer] = useState("Referrer");

   const sendFormData = async () => {
      await fetch("http://localhost:3002/visitors", {
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
                  <input type="text" class="form-input" value={email} onChange={(e) => {setEmail(e.target.value)}}></input><br/>
                  <label>Phone:</label>
                  <input type="text" required class="form-input" value={phone} onChange={(e) => {setPhone(e.target.value)}}></input><br/>
                  <label>Referrer:</label>
                  <input type="text" required class="form-input" onChange={(e) => {setReferrer(e.target.value)}}></input><br/>
                  <button class="form-button" onClick={sendFormData}>Submit</button>
               </div>
         </div>
   )
}

// purpose is to get text from image
const processImageData = async (url) => {
   const worker = await createWorker({
      logger: m => console.log(m)
   })
   
   const processWorker = async () => {
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {data: { text } } = await worker.recognize("https://marketplace.canva.com/EAGLrR2e2H8/1/0/1600w/canva-blue-modern-business-card-PSng3mW2xTM.jpg");
      console.log(text);
      const relevantData = parseOCRText(text);
      await worker.terminate();
   }

   processWorker();
}

const parseOCRText = async (ocrText) => {
   const relevantTextResponse = await fetch("http://localhost:3002/gpt", {
      method: 'POST',
      headers: {
         'Content-Type': "application/json"
      },
      body : JSON.stringify({
         prompt: ocrText,
      }),
   })
}



