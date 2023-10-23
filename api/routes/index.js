const { Router } = require("express");

const router = Router();

router.use("/api/users", require("./user"));
router.use("/api/rooms", require("./room"));

module.exports = router;
