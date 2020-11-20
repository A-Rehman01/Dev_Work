const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const config = require("config");
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
});

//@route POST /api/auth
//@desc authentication of user
//@access Public

router.post(
  "/",
  [
    check("email", "please include the valid email").isEmail(),
    check("password", "password is required").not().isEmpty(),
  ],
  async (req, res) => {
    //   console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (!user) {
        // console.log(user);
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }

      //decrypt pasword
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user._id, //alse user.id valid
        },
      };
      JWT.sign(
        payload,
        config.get("jwttoken"),
        { expiresIn: 360000 }, // token expire in
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.messagr);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
