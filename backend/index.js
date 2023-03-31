const express = require("express")
const client = require("./db/client")
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config()

const router = require("./api/index")


const app = express();

app.use(cors())

app.use(express.json())

app.use(morgan("dev"))

app.use("/api" , router)

client.connect()
app.listen(3001, () => {
    console.log("We are now connected to port 3001")
})


