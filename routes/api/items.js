const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item')

// @ GET api/items
// @desc Get All Items
// @acces Public

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1})
    .then(items => res.json(items))
});

// @ POST api/items
// @desc Create a item
// @acces Public

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item)); 
});

// @ DELETE api/items/:id
// @desc Delete a item
// @acces Public

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(e => res.status(404).json({success: false }))
})


module.exports = router;