import { model, Schema, Document } from "mongoose";


export interface RequestModelInterface {
  _id?: string;
  lat: number;
  lng: number;
  fieldTitle: string;
  fieldContent: string;
  fieldAddress:string;
}

export type RequestModelDocumentInterface = RequestModelInterface & Document;

const RequestSchema = new Schema({
  lat: {
    required: true,
    type: Number,
  },
  lng: {
    required: true,
    type: Number,
  },
  fieldTitle: {
    required: true,
    type: String,
  },
  fieldContent:{
    required: true,
    type: String,
  },
  fieldAddress:{
    required: true,
    type: String,
  },
});

export const RequestModel = model<RequestModelDocumentInterface>("Request", RequestSchema);
