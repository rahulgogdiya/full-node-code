const express = require("express");
const {
  handleGetAlluser,
  handlegetUserById,
  handlegetUpdateuserById,
  handleDeleteuserById,
  handleCreateUser,
} = require("../controllers/user");

const router = express.Router();

// router.get("/", handleGetAlluser);
// router.post("/", handleCreateUser);
// same  work defactor--
router.route("/").get(handleGetAlluser).post(handleCreateUser);

router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handlegetUpdateuserById)
  .delete(handleDeleteuserById);

module.exports = router;
