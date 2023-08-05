const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          throught: ProductTag,
        },
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ message: 'This Tag does not exist in the database!' });
    }
    } catch (err) {
      res.status(500).json(err);
    }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedTag > 0) {
      const tag = await Tag.findByPk(req.params.id);
      res.status(200).json(tag);
    } else {
      res.status(404).json({ message: 'Tag was not found or there was no update!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedTag > 0) {
      res.status(200).json({ message: 'Tag has been deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Tag was not found!' });
    } 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
