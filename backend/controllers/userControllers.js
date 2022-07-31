const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const { use } = require("express/lib/application");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password, pic, roles, isActif } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    roles,
    isActif,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isActif: user.isActif,
      pic: user.pic,
      roles: user.roles,

      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log("a1", email, password, ".");

  const user = await User.findOne({ email });
  //console.log("a2", user.email, user.password, ".");
  if (user && (await user.matchPassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isActif: user.isActif,
      pic: user.pic,
      roles: user.roles,

      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const getAllUsers = async (req, res) => {
  //   let filter = {};
  //   if (req.query._isActif) {
  //     filter = { isActif: req.query._isActif.split(",") };
  //     const allUser = await user.find(filter).populate("isActif");
  //   }
  // };

  try {
    // const pageSize = 5;
    const limit = parseInt(req.params.limit);

    const total = await User.countDocuments({});
    const page = parseInt(req.params.page);
    const result = await User.find()
      .limit(limit)
      .skip(limit * page);
    //  console.log(limit);
    // console.log(page);
    res.json({ result: result, totalpage: Math.ceil(total / limit) });
  } catch (err) {
    console.log(err);
  }
  //   const result = await User.find({});
  //   res.send(result);
  // } catch (err) {
  //   console.log(err);
  // }
};
const addProf = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password, roles } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    roles,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,

      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateUser = async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send({ message: "user deleted with sucess" });
  } catch (err) {
    console.log(err);
  }
};
const getOnUsers = async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
const getOnUsersIs = async (req, res) => {
  try {
    // const pageSize = 3;
    // const total = await User.countDocuments({});
    // const page = parseInt(req.query.page || "0");
    let filter = {};

    //console.log(req.params.isActif);
    var isActif = req.params.isActif.toLowerCase() === "true";

    filter = { isActif: isActif };
    const getOnUsersIs = await User.find(filter).populate("isActif");
    console.log(getOnUsersIs);

    res.send(getOnUsersIs);
  } catch (err) {
    console.log(err);
  }
};
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log("user", user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.roles = req.body.roles || user.roles;

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: updatedUser.name,
      email: updatedUser.email,
      roles: updatedUser.roles,

      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  registerUser,
  authUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getOnUsers,
  getOnUsersIs,
  addProf,
  updateUserProfile,
};
