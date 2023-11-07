import { model, Schema, Document } from "mongoose";

export interface UserModelInterface {
  _id?: string;
  email: string;
  password: string;
  nickname: string;
  about?:string;
  portrait?:string;
  expirience?:string;
  isAdmin?: boolean;
  myEvents?: Array<String>,
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  nickname: {
    unique: true,
    required: true,
    type: String,
  },
  portrait: {
    type: String,
    default:'https://www.clipartmax.com/png/middle/345-3451310_biblethump-png-avatan-plus-%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-%D1%84%D0%BE%D1%82%D0%BE%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80-%D1%80%D0%BE%D1%84%D0%BB%D0%B0%D0%BD-%D0%B5%D0%B1%D0%B0%D0%BB%D0%BE.png'
  },
  about: {
    type: String,
  },
  expirience: {
    type:String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  myEvents:[{
    type: Schema.Types.ObjectId,
    ref: 'Event',
    default:[],
  }],
});

UserSchema.set("toJSON", {
  transform: function (_: any, obj: { password: any }) {
    delete obj.password;
    return obj;
  },
});

export const UserModel = model<UserModelDocumentInterface>("User", UserSchema);
