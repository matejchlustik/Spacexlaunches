const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.post("/auth", authController.auth_post);
router.post("/comment", authController.comment_post);
router.get("/comment/:id", authController.comment_get);

module.exports = router;