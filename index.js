const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const router = require("./routes/userr")
const env = require("dotenv")
env.config()
const cookieParser = require("cookie-parser")
const dbURI = process.env.MONGODB_URI;
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3001"],
    credentials:true
}))
console.log(dbURI)
mongoose.connect(dbURI).then(()=>{
    console.log("connected to database")
})

app.use("/auth",router)

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

