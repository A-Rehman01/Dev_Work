const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const { check, validationResult, body } = require("express-validator");
const auth = require("../../middlewares/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

//@route GET /api/profile/me
//@desc Get Current user Profile
//@access private

router.get("/me", auth, async (req, res) => {
  try {
    // console.log(req.user.id);
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).send({ msg: "There is no Profile for this User" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route POST /api/profile
//@desc Create or Update Profile
//@access private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
    }
    const {
      company,
      location,
      website,
      bio,
      githubusername,
      skills,
      status,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    //Build profie object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //Build Social object
    profileFields.social = {};
    // if we dont do this direct profileFields.social.youtube its gives not find error
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//@route GET /api/profile
//@desc gett all profiles
//@access public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/profile/user/:user_id
//@desc get profile by user_id
//@access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not Found" });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Profile not Found" });
    res.status(500).send("Server Error");
  }
});

//@route DELETE /api/profile
//@desc delete profiles and users
//@access private

router.delete("/", auth, async (req, res) => {
  try {
    // DELETE user posts
    await Post.deleteMany({ user: req.user.id });
    //DELETE profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //DELETE user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "Delete User" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT /api/profile/experience
//@desc add user experience
//@access private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "Fro date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ error: error.array() });
    }
    const {
      title,
      company,
      from,
      to,
      current,
      location,
      description,
    } = req.body;

    const expNew = {
      title,
      company,
      from,
      to,
      current,
      location,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(expNew);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE /api/profile/experience/exp_id
//@desc delete user experience profille
//@access private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get index and remove from array
    const removeIndex = profile.experience
      .map((index) => index._id)
      .indexOf(req.params.exp_id);
    // console.log(removeIndex);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT /api/profile/education
//@desc add user education
//@access private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of Study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ error: error.array() });
    }
    const {
      school,
      degree,
      from,
      to,
      current,
      fieldofstudy,
      description,
    } = req.body;

    const eduNew = {
      school,
      degree,
      from,
      to,
      current,
      fieldofstudy,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(eduNew);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE /api/profile/education/edu_id
//@desc delete user education profille
//@access private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get index and remove from array
    const removeIndex = profile.education
      .map((index) => index._id)
      .indexOf(req.params.edu_id);
    // console.log(removeIndex);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/profile/github/:username
//@desc get user repos from Github
//@access public
router.get("/github/:username", (req, res) => {
  const options = {
    uri: `https://api.github.com/users/${
      req.params.username
    }/repos?per_page=5&sort=created:asc&client_id=${config.get(
      "gitHubSecretID"
    )}&client_secret=${config.get("gitHubSecret")}`,
    method: "GET",
    headers: { "user-agent": "node.js" },
  };

  request(options, (error, response, body) => {
    console.log(error);

    if (response.statusCode !== 200) {
      return res.status(404).json({ msg: "No Github profile found" });
    }

    res.json(JSON.parse(body));
  });
});
module.exports = router;
