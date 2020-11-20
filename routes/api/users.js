const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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
  (req, res) => {
    //   console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    res.send("User API");
  }
);

module.exports = router;
