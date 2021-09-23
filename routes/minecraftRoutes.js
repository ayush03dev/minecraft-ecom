import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/name/:name', async (req, res) => {
    const name = req.params['name'];
    try {
        const player = await getPlayerByName(name);
        if (!player) {
            return res.status(404).json({message: 'Could not find player with that name!'});
        }
        return res.json(player);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: `Internal Server Error: ${error.message}`});
    }
});

router.get('/uuid/:uuid', async (req, res) => {
    const uuid = req.params['uuid'];
    try {
        const player = await getPlayerById(uuid);
        if (!player) {
            return res.status(404).json({message: 'Could not find player with that uuid!'});
        }
        return res.json(player);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message: `Internal Server Error: ${error.message}`});
    }
});

export const getPlayerById = async uuid => {
    try {
        const response = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
        if (response.status != 200) {
            return null;
        }
        const { name, id } = response.data;
        const skin = `https://crafatar.com/avatars/${id}`;

        return {name, id, skin};
    } catch (error) {
        return null;
    }
}

export const getPlayerByName = async username => {
    try {
        const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
         if (response.status != 200) {
            return null;
        }
        const { name, id } = response.data;
        const skin = `https://crafatar.com/avatars/${id}`;

        return {name, id, skin};
    } catch (error) {
        return null;
    }
}

export default router;