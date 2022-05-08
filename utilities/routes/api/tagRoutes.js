const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        fields: ['id'],
  // be sure to include its associated Product data
  include: [{ model: Product, as: 'products_with_tag'}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// find a single tag by its `id`
  router.get('/:id', async (req, res) => {
    try {
      const tagData = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
  include: [{ model: Product, as: 'products_with_tag'}]
});
if (!tagData) {
  res.status(404).json({message: "No tag with this ID found"});
  return;
}
res.status(200).json(tagData);
} catch (err) {
res.status(500).json(err);
console.log(err);
}
});



// create a new tag
  router.post('/', async (req, res) => {
    try {
      const newTag = await Tag.create(req.body);
      res.status(200).json(newTag);
      } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});


// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
    try {
      const updatedTag = await Tag.update(req.body, {
        where: { id: req.params.id,}
      });
      res.status(200).json(updatedTag);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
});


// delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {id: req.params.id}
      });
      if (!tagData) {
        res.status(400).json({message: "Tag with this ID not found"});
        return;
      } 
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
