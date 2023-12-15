const { Router } = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", authMiddleware, userController.getCurrent);

module.exports = router;
