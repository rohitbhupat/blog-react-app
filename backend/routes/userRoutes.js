const express = require("express")
const router = express.Router();

//Controller
const {getAllUsers, getUserById, createUser, updateUser, deleteUser}= require("../controllers/userController");

//routes
router.get("/getusers", getAllUsers);
router.get("/getuser/:id", getUserById);
router.post("/adduser", createUser);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;