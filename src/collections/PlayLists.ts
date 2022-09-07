import mongoose, { Schema, model } from 'mongoose';
import { VideosSchema } from './Videos';


// 1. Create an interface representing a document in MongoDB.
interface IPlayLists {   
    name: string;
    description: string;
    createBy: string;
    role: string;
    videos: object[];
}

// 2. Create a Schema corresponding to the document interface.
const PlayListsSchema = new Schema<IPlayLists>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,    
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    createBy: {
        type: String,
        of: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true,
    },
    videos: {
        type: [VideosSchema],
        default: [],
        unique: false     
    },
});


// 3. Create a Model.
export const PlayLists = model<IPlayLists>('PlayLists', PlayListsSchema);
