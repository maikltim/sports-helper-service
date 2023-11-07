import { model, Schema, Document } from "mongoose";
import { FieldModelDocumentInterface } from '../models/FieldModel'


export interface MarkModelInterface {
  _id?: string;
  lat?: string;
  lng?: string;
  info?: string;
  field?: FieldModelDocumentInterface;
}

export type MarkModelDocumentInterface = MarkModelInterface & Document;

const MarkSchema = new Schema({
  lat: {
    unique: true,
    required: true,
    type: Number,
  },
  lng: {
    unique: true,
    required: true,
    type: Number,
  },
  info: {
    type: String,
  },
  field: {
    type: Schema.Types.ObjectId,
    ref: 'Field',
    default: ''
  },
});

export const MarkModel = model<MarkModelDocumentInterface>("Mark", MarkSchema);
