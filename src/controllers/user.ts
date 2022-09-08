import { Request, Response } from "express";
import { Users } from '../collections/Users';
// const Users = require('../collections/Users');


/* Ruta para crear la cuenta de un usuario en la base de datos. */
export const createUser = async (req: Request, res: Response) => {
    let { name, email, image } = req.body;
    // console.log('me llega el email', email);

    if (!name || !email || !image) {
        return res.status(200).json({ create: false, user: null });
    }

    try {
        const userCreate = new Users({ name, email, image });

        await userCreate.save();

        return res.status(200).json({ create: true, user: userCreate });

    } catch (error) {
        // console.log(error);
        return res.status(400).json({ create: false, user: null });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    // console.log('me llega el pedido de usuarios');

    try {
        const allUsers = await Users.find({});

        return res.status(200).json({ get: true, data: allUsers });

    } catch (error) {
        // console.log(error);
        return res.status(400).json({ get: false, data: null });
    }

}