const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

//@route POST /api/users
//@desc Registration of User
//@access Public

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please include the valid email").isEmail(),
    check("password", "password must be atleast 6 digit long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //   console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { name, email, password } = req.body;
    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        // console.log(user);
        return res.status(400).json({ error: [{ msg: "User Already Exist" }] });
      }
      // get user gravater
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        //only create not save yet
        name,
        email,
        avatar,
        password,
      });

      //encrypt pasword
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save(); // now save in databse

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
