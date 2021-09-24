const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catagoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newBody = {
      category_name: req.body.category_name,
    };

    const newCategory = await Category.create(newBody);
    res.json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  const categoryName = {
    category_name: req.body.category_name,
  };

  try {
    const categoryData = await Category.update(categoryName, {
      where: { id: categoryId },
    });
    res.json(categoryName);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;
  try {
    const categoryData = await Category.destroy({
      where: {
        id: categoryId,
      },
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
