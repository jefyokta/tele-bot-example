import express, { Request, Response } from "express";


const app = express()

const TELE_TOKEN = 'abcd'
const TELE_URL = `https://api.telegram.org/bot${TELE_TOKEN}`;


import bodyparser from "body-parser";

app.use(bodyparser.json());

app.post("/tele-endpoint",(req:Request,res:Response)=>{
    const {message}:TelegramUpdate= req.body


    const chat = message.chat
    const text = message.text

    //prosess balasan chat
    ///...

    //
 

    // bisa juga pake axioa
    fetch(`${TELE_URL}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ chat_id: chat.id, text:'halo dari bot' }), 
      })
      res.status(200)

})

app.listen(3000)
