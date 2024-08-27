const router = require("express").Router()
const userController = require("../controllers/user.controller")
const { protectedRoute } = require("../utils/protected")

router
    .get("/", protectedRoute, userController.getAllUsers)
    .post("/create-user", userController.createUser)
    .delete("/delete-user/:id", userController.deleteUser)
    .put("/update-user/:id", userController.updateUser)

module.exports = router