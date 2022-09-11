import { Request, Response } from 'express';
import { PlayLists } from '../collections/PlayLists';
import { isValidObjectId } from '../helpers/isObject';

export const getPlayLists = async (req: Request, res: Response) => {
    try {
        const allPlayLists = await PlayLists.aggregate([
            { $project: { name: 1, description: 1, createBy: 1 } },
            { $match: {} }
        ])

        return res.status(200).json({ get: true, data: allPlayLists });

    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            get: false,
            data: null,
            message: 'Error, get is not possible'
        });
    }
}

export const createPlayList = async (req: Request, res: Response) => {
    console.log('me llegan los datos necesarios a createLists', req.body);
    // name:
    // description:
    // createBy: { // mongoose.SchemaTypes.ObjectId, 
    // videos: { // VideosSchema, // {},
    let { name, description, createBy, videos } = req.body;

    if (!name || !description || !createBy) {
        return res.status(200).json({
            create: false,
            data: null,
            message: 'Incompleted data'
        });
    }

    if (!isValidObjectId(createBy)) {
        return res.status(200).json({
            create: false,
            data: null,
            message: 'CreateBy is not an onbject Id'
        });
    }

    if (videos && !Array.isArray(videos)) {
        return res.status(400).json({
            message: 'Videos is not an array'
        });

    }

    try {
        const userPlayList = new PlayLists(req.body);

        await userPlayList.save();

        return res.status(200).json({ create: true, data: userPlayList });

    } catch (error) {

        return res.status(400).json({
            create: false,
            data: error,
            message: 'Name is not available'
        });
    }
}

export const editPlayList = async (req: Request, res: Response) => {
    let { listId, name, description, videos } = req.body;

    if (!name || !description) {
        return res.status(200).json({
            update: false,
            data: null,
            message: 'Incompleted data'
        });
    }

    if (!isValidObjectId(listId)) {
        return res.status(200).json({
            update: false,
            data: null,
            message: 'CreateBy is not an onbject Id'
        });
    }
    // console.log(videos, ' esto es videos en edit play list');
    if (videos && !Array.isArray(videos)) {

        return res.status(400).json({
            message: 'Videos is not an array'
        });

    }


    // createBy trae el id del creador de la lista
    // Ver si voy a poner una validación para asegurame que sea el creador
    // sea el único que pueda solicitar una actualización
    try {
        const filter = { _id: listId };
        //const updateVideo = { videos: [] };
        //await PlayLists.findOneAndUpdate(filter, updateVideo, {
        //    new: true
        //});

        const update = req.body;

        let listUpdate = await PlayLists.findOneAndUpdate(filter, update, {
            new: true
        });

        return res.status(200).json({ update: true, data: listUpdate });

        // return res.status(200).json({ update: false, data: req.body });

    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            update: false,
            data: error,
            message: 'Error, update is not possible'
        });
    }

}

export const getListsByUserId = async (req: Request, res: Response) => {
    let { userId } = req.body;

    if (!userId) {
        return res.status(200).json({
            get: false,
            data: null,
            message: 'UserId is necessary'
        });
    }

    if (!isValidObjectId(userId)) {
        return res.status(200).json({
            get: false,
            data: null,
            message: 'UserId is not an onbject Id'
        });
    }

    try {
        const filter = { createBy: userId };

        let getLists = await PlayLists.find(filter);

        return res.status(200).json({ get: true, data: getLists });

    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            get: false,
            data: error,
            message: 'Error, get is not possible'
        });

    }

}

export const deletePlayList = async (req: Request, res: Response) => {
    let { listId } = req.body;

    // console.log('llego el delete', req.body)

    if (!listId) {
        return res.status(200).json({
            delete: false,
            data: null,
            message: 'ListId is necessary'
        });
    }

    if (!isValidObjectId(listId)) {
        return res.status(200).json({
            delete: false,
            data: null,
            message: 'ListId is not an onbject Id'
        });
    }

    try {
        const filter = { _id: listId };

        let deleteList = await PlayLists.deleteOne(filter);

        if (deleteList.deletedCount === 0) {
            return res.status(200).json({
                delete: false,
                data: deleteList
            });
        }
        if (deleteList.deletedCount === 1) {
            return res.status(200).json({
                delete: true,
                data: deleteList
            });

        }


    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            delete: false,
            data: error,
            message: 'Error, delete is not possible'
        });

    }

}


export const getPlayListById = async (req: Request, res: Response) => {
    let { listId }: any = req.query;

    // console.log('llego getPlayListById', req.query)

    if (!listId) {
        return res.status(200).json({
            get: false,
            data: null,
            message: 'ListId is necessary'
        });
    }

    if (!isValidObjectId(listId)) {
        return res.status(200).json({
            get: false,
            data: null,
            message: 'ListId is not an onbject Id'
        });
    }

    try {
        const filter = { _id: listId };

        let getOneList: any = await PlayLists.findOne(filter);

        if (getOneList === null) {
            return res.status(200).json({
                get: false,
                data: getOneList
            });
        }
        if (getOneList) {
            return res.status(200).json({
                get: true,
                data: getOneList
            });
        }

    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            get: false,
            data: error,
            message: 'Error, get is not possible'
        });

    }

}