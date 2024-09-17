const express = require("express");
const router = express.Router();
const { UserController } = require(`../controllers/index`);
const authenticationToken = require(`../middleware/auth`);

// post
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// get
router.get("/current", authenticationToken, UserController.current);
router.get("/users", authenticationToken, UserController.getAllUsers);
// router.get("/user/:id", authenticationToken, UserController.getUserById);

// put
router.put("/update", UserController.updateUser);

// delete
router.delete("/user", authenticationToken, UserController.deleteUser);

module.exports = router;

// gotowo register, login, current
