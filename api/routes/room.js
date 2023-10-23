const { Router } = require("express");
const roomController = require("../controllers/roomController");

const router = Router();

router.get("/", roomController.getAll);
router.get("/:id", roomController.getById);

module.exports = router;
