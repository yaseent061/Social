const express = require("express");
const connectDB = require("./config/db")
const app = express();

const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("API running")
})

connectDB()

app.listen(PORT, ()=>{
    console.log(`Port started on ${PORT}`)
})