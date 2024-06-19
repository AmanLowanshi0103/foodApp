const connectToMon=require("./db")
const fetchData=require("./FoodDataRetrive")
const express = require('express')
var cors = require('cors')
const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

app.use("/api/user",require("./Routes/User.js"))
app.use("/api/user",require("./Routes/DisplayData"))
app.use("/api/user",require("./Routes/OrderData"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})