const express = require("express");
const router = express.Router();

//* Middleware
const sessionChecker = require("../middleware/sessionChecker");

//* Controller
const authController = require("../controllers/auth.controller");

router.get("/logout", authController.getLogout);
router.post("/login", authController.postLogin);
router.post("/register", authController.postRegister);
router.get("/users", sessionChecker, authController.getUsers);

module.exports = router;
