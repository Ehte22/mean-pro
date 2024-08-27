const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const { OAuth2Client } = require("google-auth-library")
const Auth = require("../models/Auth")
const { genrateToken } = require("../utils/genrateToken")

exports.singUp = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body

    const user = await Auth.findOne({ email })
    if (user) {
        return res.status(400).json({ message: "Email already exist" })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const result = await Auth.create({ ...req.body, password: hashPassword })

    res.status(200).json({
        message: "User SignUp Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            role: result.role
        }
    })

})

exports.signIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const result = await Auth.findOne({
        $or: [
            { email: username },
            { phone: username },
        ]
    })
    if (!result) {
        return res.status(400).json({ message: "Invalid Credential - Username do not match" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(400).json({ message: "Invalid Credential - Password do not match" })
    }

    const token = genrateToken({ userId: result._id })

    res.cookie("auth", token, { maxAge: 864000000, httpOnly: true, secure: process.env.NODE_ENV === "production" })

    res.status(200).json({
        message: "User Login Success", result: {
            _id: result._id,
            name: result.name,
            username: result.email
        }
    })
})

exports.signOut = asyncHandler(async (req, res) => {
    res.clearCookie("auth")
    res.status(200).json({ message: "User Logout Success" })
})

exports.continueWithGoogle = asyncHandler(async (req, res) => {
    const { credential } = req.body.token
    console.log(credential);
    const client = new OAuth2Client({ credential: process.env.GOOGLE_CLIENT_ID })
    const verify = await client.verifyIdToken({ idToken: credential })

    if (!verify) {
        return res.status(401).json({ message: "Unauthorized Access" })
    }
    const { name, email, picture } = verify.payload
    const result = await Auth.findOne({ email })
    if (result) {
        // login
        const token = genrateToken({ userId: result._id })
        res.cookie("auth", token, {
            maxAge: 864000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })
        res.json({
            message: "Login Success", result: {
                _id: result._id,
                name: result.name,
                username: result.email
            }
        })
    } else {
        // register 
        const newUser = await Auth.create({ name, email, phone: "8787878787" })
        const token = genrateToken({ userId: newUser._id })
        res.cookie("auth", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })
        res.json({
            message: "Register Success", result: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role
            }
        })
    }
})