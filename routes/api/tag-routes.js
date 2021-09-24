const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;
  try {
    const tagData = await Tag.findByPk(tagId, {
      include: [{ model: Product }],
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newBody = {
      tag_name: req.body.tag_name,
    };

    const newTag = await Tag.create(newBody);
    res.json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const tagId = req.params.id;
  const tagName = {
    tag_name: req.body.tag_name,
  };

  try {
    const categoryData = await Tag.update(tagName, {
      where: { id: tagId },
    });
    res.json(tagName);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;
  try {
    const tagData = await Tag.destroy({
      where: {
        id: tagId,
      },
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
