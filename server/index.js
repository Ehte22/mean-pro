const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
require("dotenv").config({ path: "./.env" })

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))
app.use(cookieParser())
// app.use(express.static("public"))
app.use("/public", express.static(path.join(__dirname, "public")))

app.use("/api/v1/user", require("./routes/user.routes"))
app.use("/api/v1/auth", require("./routes/auth.routes"))

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Resource Not Found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})

const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("DB is connected");
    app.listen(PORT, console.log(`Server is running on ${PORT}`))
})