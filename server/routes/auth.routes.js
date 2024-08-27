const router = require("express").Router()
const authController = require("../controllers/auth.controller")

router
    .post("/signup", authController.singUp)
    .post("/signin", authController.signIn)
    .post("/signout", authController.signOut)
    .post("/login-with-google", authController.continueWithGoogle)

module.exports = router