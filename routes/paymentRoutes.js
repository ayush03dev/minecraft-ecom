import express from 'express';
import { check, validationResult } from 'express-validator';
import { captureOrder, createOrder } from '../config/paypal.js';
import { Package } from '../models/packageModel.js';
import { Transaction } from '../models/transactionModel.js';
import { Player } from '../models/playerModel.js';
import { getPlayerByName, getPlayerById } from './minecraftRoutes.js';
import axios from 'axios';

const router = express.Router();

router.post('/create', [[
    check('package_id', 'Package id must be valid!').not().isEmpty().isMongoId(),
    check('uuid', 'Specify a valid player uuid').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (errors && errors.length > 0) {
        return res.json(400).json({errors});
    }

    const { package_id, uuid } = req.body;

    try {
        const player = await getPlayerById(uuid);
        if (!player) {
            return res.status(400).json({message: 'Invalid player uuid!'});
        }
        const p = await Package.findById(package_id).exec();
        if (!p) {
            return res.status(404).json({message: 'Could not find package with that id!'});
        }

        const { price, currency } = p;
        const orderId = await createOrder(price, currency);
        return res.json({id: orderId});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message}); 
    }
});

router.post('/execute', [[
    check('uuid', 'Specify a valid uuid').not().isEmpty(), 
    check('package_id', 'Specify a valid package id').not().isEmpty().isMongoId(),
    check('order_id', 'Specify a valid order id').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (errors && errors.length > 0) {
        return res.json(400).json({errors});
    }

    const { uuid, package_id, order_id } = req.body;

    try {
        const player = await getPlayerById(uuid);
        if (!player) {
            return res.status(400).json({message: 'Invalid player uuid!'});
        }

        const p = await Package.findById(package_id);
        if (!p) {
            return res.status(404).json({message: 'Package with that id could not be found!'});
        }

        const response = captureOrder(order_id);
        const txn = new Transaction({uuid, package: package_id, price: p.price, currency: p.currency});
        await txn.save();

        var playerDoc = await Player.findOne({uuid});
        if (!playerDoc) {
            playerDoc = new Player({uuid});
        }

        playerDoc.transactions.push(txn._id);
        await playerDoc.save();

        if (global.mcSocket) {
            mcSocket.send(`cmd:broadcast ${player.name} has purchased ${p.name} for $${p.price}!`)
        }
        return res.json(response);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: 'Internal Server Error: ' + error.message}); 
    }
})

export default router;