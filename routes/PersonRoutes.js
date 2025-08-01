const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming the request body contains the person data
        const newPerson = new Person(data); // Create a new person document using the Mongoose model
        const response = await newPerson.save(); // Save the new person to the database
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
})

// Get method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
})

router.get('/:work', async (req, res) => {
    try {
        const workType = req.params.work; // Extract the work type from the URL parameter.
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({
                work: workType
            });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({
                error: 'Invalid work type'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

// PUT method to update the person data
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;                           // Extract the person ID from the URL parameter.
        const data = req.body;                             // Assuming the request body contains the updated person data.
        const response = await Person.findByIdAndUpdate(id, data, {
            new: true,                                    // return the updated document
            runValidators: true,                         // run mongoose validation
        });
        if (!response) {
            return res.status(404).json({
                error: 'Person not found'
            });
        }
        console.log('person data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id; // Extract the person ID from the URL parameter.
        const response = await Person.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('person deleted');
        res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
            }
})

module.exports = router;