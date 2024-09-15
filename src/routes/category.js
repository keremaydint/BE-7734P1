const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.getAll(req.query);
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Category/GET all isteği" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Girdiğiniz id ile ilgili bir kayıt yok!" });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Category/GET id isteği" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    console.log(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Category/POST isteği" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.params.id, req.body);
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Category/Patch isteği" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.softDelete(req.params.id);
    res.json(deletedCategory);
  } catch (error) {
    res.status(400).json({ message: "Hata oluştu. Category/Delete isteği" });
  }
});

module.exports = router;
