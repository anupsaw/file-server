import { Schema, Model, Document, Mongoose, SchemaType, SchemaDefinition, SchemaOptions, SchemaTypeOpts } from 'mongoose';
import { db } from '../connect';

const userSchemaDefinition: SchemaDefinition = {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false, default: '' },
    lastName: { type: String, required: true },
};

export interface IUser {
    firstName: string;
    middleName: string;
    lastName: string;
}

export interface IUserModel extends IUser, Document { }

const userSchema = new Schema(userSchemaDefinition);
export const UserModel: Model<IUserModel> = db.model<IUserModel>('User', userSchema);
