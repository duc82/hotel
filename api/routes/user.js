const { Router } = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.getMe);

module.exports = router;
