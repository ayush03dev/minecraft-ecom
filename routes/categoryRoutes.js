import express from 'express';
import { Category } from '../models/categoryModel.js';
import { check, validationResult } from 'express-validator';
import { Package } from '../models/packageModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        return res.json(categories);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message});
    }
});

router.get('/:name', async (req, res) => {
    const name = req.params['name'];

    try {
        const category = await Category.findOne({name});
        if (!category) {
            return res.status(404).json({message: 'Could not category with that name!'});
        }
        return res.json(category);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message});
    }
});

router.post('/', [[
    check('name', 'Name is required!').not().isEmpty(),
    check('servers', 'Servers must be array of strings!').optional().isArray({min: 1})
]], async (req, res) => {
    const result = validationResult(req);

    if (result && result.errors.length > 0) {
        return res.status(400).json(result);
    }

    const { name, servers } = req.body;
    
    try {
        const exists = await Category.findOne({name});
        if (exists) {
            return res.status(400).json({message: 'Category with that name already exists!'});
        }

        const category = new Category({name, servers});
        await category.save();
        return res.json(category);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message}); 
    }
});

router.post('/package', [[
    check('packages', 'packages must be an array of strings!').isArray({min: 1}),
    check('category', 'category must be specified').not().isEmpty()
]], async (req, res) => {
    const result = validationResult(req);
    if (result && result.errors.length > 0) {
        return res.status(400).json(result.errors);
    }

    const { packages, category } = req.body;

    try {
        const cat = await Category.findOne({category});
        if (!cat) {
            return res.status(404).json({message: 'Could not find category with that name!'});
        }

        for (const pkg of packages) {
            const check = await Package.findOne({name: pkg});
            if (!check) {
                return res.status(400).json({message: `Package with name ${pkg} does not exist!`});
            }
            if (cat.packages.includes(check._id)) continue;
            cat.packages.push(check._id);
        }
        await cat.save();
        return res.json(cat);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message}); 
    }
})


router.get('/:name/packages', async (req, res) => {
    const name = req.params['name'];
    try {
        var cat = await Category.findOne({name});
        if (!cat) {
            return res.status(404).json({message: 'Could not find category with that name!'});
        }

        cat = await cat.populate('packages');

        return res.json(cat.packages);
    } catch (error) {
        
    }
})

export default router;