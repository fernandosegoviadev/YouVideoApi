import { Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IVideos {
    position: Number;
    videoId: string;
    title: string;
    image: string;
    channel: string;
}

// 2. Create a Schema corresponding to the document interface.
export const VideosSchema = new Schema<IVideos>({
    position: {
        type: Number,
        required: true,
        unique: false,
    },
    videoId: {
        type: String,
        required: true,
        unique: false,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
});

// 3. Create a Model.
// export const Videos = model<IVideos>('Videos', VideosSchema);
