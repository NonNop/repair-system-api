const express = require("express");
const router = express.Router();
const { login, currentUser } = require("../controllers/authController");
const { auth, adminCheck } = require("../middleware/auth");

router.post("/login", login);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, adminCheck, currentUser);

module.exports = router;
