const express = require("express");
const studentController = require("../src/user/studentController");
const authController = require("../src/user/authController");

const router = express.Router();

//auth
router.post("/auth/signup", authController.signupUserfn);
router.post("/auth/login", authController.loginUserfn);

//student
router.get("/user/getAll", studentController.getDataControllerfn);
router.post("/user/create", studentController.createstudentControllerfn);
router.patch("/user/update/:id", studentController.updatestudentControllerfn);
router.delete("/user/delete/:id", studentController.deletestudentControllerfn);

module.exports = router;
