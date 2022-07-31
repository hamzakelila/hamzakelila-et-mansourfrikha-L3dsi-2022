const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getOnUsers,
  getOnUsersIs,
  addProf,
  updateUserProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
//registre
router.route("/").post(registerUser);
//login
router.post("/login", authUser);
//modifier
router.put("/:id", updateUser);
//supprimer
router.delete("/:id", deleteUser);
//find all user
router.get("/allUser/:page/:limit", getAllUsers);
//find one user
router.get("/:id", getOnUsers);
//add prof
router.route("/addProf").post(addProf);
//find one user by isactif
router.get("/getOnUsersIs/:isActif", getOnUsersIs);
//profile
router.route("/profile").post(protect, updateUserProfile);
module.exports = router;
