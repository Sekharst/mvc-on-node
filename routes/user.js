const express = require("express");
const {
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleCreateNewUser,
} = require("../controller/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router.route("/login").get(handleGetUserById)

router
  .route("/:id")
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);


module.exports = router