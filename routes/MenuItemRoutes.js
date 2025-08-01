const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// POST route to add menuItems
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Menu data is saved');
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }

});

// Get method to get all the menuItems
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log(' Menu data is fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste; // Extract the taste type from the URL parameter.
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const response = await MenuItem.find({
                taste: tasteType
            });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({
                error: 'Invalid taste type'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

// put method to update a menu item
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await MenuItem.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        console.log('Menu item is updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// Delete method to delete a menu item
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await MenuItem.findByIdAndDelete(id);
        console.log('Menu item is deleted');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


// comment added for testing purpose
module.exports = router;