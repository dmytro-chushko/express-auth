const Router = require("express");
const authController = require("./authController");
const { check } = require("express-validator");

const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Username couldn't be empty").notEmpty(),
    check(
      "password",
      "Passwod has to be between 4 and 100 cheracters"
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.post("/role", authController.createRole);
router.get("/users", authController.getUsers);

module.exports = router;
