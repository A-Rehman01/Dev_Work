const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middlewares/auth");

//@route POST /api/posts
//@desc Create a post
//@access Private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET /api/posts
//@desc get all post
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/posts/:post_id
//@desc get all post
//@access Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route DELETE /api/posts/:post_id
//@desc delete post
//@access Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }

    //Check user has owner of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not Authorized" });
    }
    await post.remove();
    res.json({ msg: "Post is Deleted" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT /api/posts/like/:post_id
//@desc like post
//@access Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }
    // check if post already like
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post has already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT /api/posts/unlike/:post_id
//@desc unlike a post
//@access Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not Found" });
    }
    // check if post already like
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not like yet" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST /api/posts/comment/post_id
//@desc Add a comment
//@access Private
router.post(
  "/comment/:post_id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.post_id);
      const postComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.push(postComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE /api/posts/comment/:post_id/:comment_id
//@desc Delete a comment
//@access Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not Found" });
    }
    //Check User has owner
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
