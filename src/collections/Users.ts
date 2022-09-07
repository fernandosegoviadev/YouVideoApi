import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  image: string;
  role: string;
  state: boolean;
}


// 2. Create a Schema corresponding to the document interface.
const UsersSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  role: {
    type: String,
    default: 'user',
  },
  state: {
    type: Boolean,
    default: true,
  },
});

// 3. Create a Model.
export const Users = model<IUser>('Users', UsersSchema);


