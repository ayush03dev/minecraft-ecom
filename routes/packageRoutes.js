import express from 'express';
import { Package } from '../models/packageModel.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const packages = await Package.find({}).exec();
        return res.json(packages);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message});
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params['id']
    try {
        const p = await Package.findById(id);
        if (!p) {
            return res.status(404).json({message: 'Could not find package with that id!'});
        }
        return res.json(p);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message});
    }
});

router.post('/', [[
    check('name', 'Name is required!').not().isEmpty(),
    check('description', 'Description is required!').not().isEmpty(),
    check('price', 'Price is required and must be a number!').isNumeric(),
    check('currency', 'Must specify a valid currency!').not().isEmpty(),
    check('commands').optional().isArray({min: 1}),
    check('servers').optional().isArray({min: 1})
]], async (req, res) => {
    const result = validationResult(req);
    if (result && result.errors.length > 0) {
        return res.status(400).json(result);
    }

    const {name, description, price, currency, commands, servers} = req.body;
    try {
        const exists = await Package.findOne({name});
        if (exists) {
            return res.status(400).json({message: 'Package with that name already exists!'});
        }

        const p = new Package({name, description, price, currency, commands, servers});
        await p.save();
        return res.json(p);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message});
    }
});

export default router;