const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors");
const connection = require("./config/db");
const { router } = require("./Routes/auth.routes");



app.use(cors());
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("app is running")
})

app.use("/auth",router)



app.listen(process.env.PORT, async(req,res)=>{
    try {
        await connection
        console.log("DB is Connected")
        console.log(`server is running at port ${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})