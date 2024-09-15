const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.getAll(req.query);
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Comment Get All" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.getById(req.params.id);
    if (!comment) {
      res.status(404);
    }
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Comment Get By Id" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Comment Post kısmı" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.params.id, req.body);
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Yorum güncellenemedi." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.delete(req.params.id);
    res.status(202).json(deletedComment);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Comment Delete" });
  }
});

module.exports = router;
