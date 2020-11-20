const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const auth = require("../../middlewares/auth"); // check if token then hit api

//@route GET /api/auth
//@desc Test route
//@access Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
  res.send("auth API");
});

module.exports = router;
