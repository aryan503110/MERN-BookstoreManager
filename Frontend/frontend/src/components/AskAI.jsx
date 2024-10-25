import React, { useEffect, useState } from "react";
import {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold} from "@google/generative-ai";
import './AskAI.css'


export default function App() {
 let [Res, setRes] = useState("");
 let [Prompt, setPropmt] = useState("Hi How are You?");


 useEffect(() => {
   function GetAnswerFromAi() {


     const apiKey = "AIzaSyBd6Ony4XoIkdIDDOoBx4TBdQM9-XiO0gM";
     const genAI = new GoogleGenerativeAI(apiKey);


     const model = genAI.getGenerativeModel({
       model: "gemini-1.5-flash",
     });


     const generationConfig = {
       temperature: 1,
       topP: 0.95,
       topK: 64,
       maxOutputTokens: 8192,
       responseMimeType: "text/plain",
     };


     async function run() {
       const chatSession = model.startChat({
         generationConfig,
         history: [],
       });


       const result = await chatSession.sendMessage(Prompt);
       console.log(result.response.text());
       setRes(result.response.text());
     }


     run();
   }
   GetAnswerFromAi();
 }, [Prompt]);






 function handleSubmit(e)
 {
   e.preventDefault();
   setPropmt(e.target[0].value);
   e.target[0].value = "";
 }




 return (
   <div className="AskAI">
   <form onSubmit={(e) => handleSubmit(e)}>
     <input type="text" />
     <button>Ask</button>
   </form>


   {Res}
 </div>
 );
}
