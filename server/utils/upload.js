const multer = require("multer")
const { v4 } = require("uuid")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname))
    },
    destination: (req, file, cb) => {
        const dest = "public"
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest)
        }
        cb(null, dest)
    }
})

module.exports = multer({ storage }).single("profile")