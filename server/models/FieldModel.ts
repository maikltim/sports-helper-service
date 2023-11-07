import { model, Schema, Document } from "mongoose";
export interface FieldModelInterface {
  _id?: string;
  title: string;
  content: string;
  address: string;
  pictures?: Array<String>,
  events: Array<String>
}

export type FieldModelDocumentInterface = FieldModelInterface & Document;

const FieldSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  pictures: [{
    type: String,
    default: ['https://thumbs.dreamstime.com/b/streetball-field-bright-sunny-day-55082514.jpg', 'https://media.npr.org/assets/img/2016/03/29/ap_090911089838_sq-3271237f28995f6530d9634ff27228cae88e3440.jpg', 'https://centrsporta-nevskiy.ru/wp-content/uploads/2020/12/xmrebgrit_c.jpg'],
  }],
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
    default: [],
  }],
});

export const FieldModel = model<FieldModelDocumentInterface>("Field", FieldSchema);
