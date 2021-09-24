const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const prodData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(prodData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const prodData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.json(prodData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newBody = {
      category_name: req.body.category_name,
    };
    console.log(req.body);
    const newCategory = await Category.create(newBody);
    res.json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new category
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
