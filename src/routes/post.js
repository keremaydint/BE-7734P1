const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.getAll(req.query);
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Get All kısmında" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.getById(req.params.id);
    if (!post) {
      res.status(404);
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Get by id kısmı" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Post kısmında" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(req.params.id, req.body);
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Post put kısmında" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.delete(req.params.id);
    res.status(202).json(deletedPost);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Delete Post kısmında" });
  }
});

module.exports = router;
