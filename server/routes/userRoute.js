const express = require("express");
const { create, deleteUser, getAll, getOne, update } = require("../controller/userController.js");

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

module.exports = route;
