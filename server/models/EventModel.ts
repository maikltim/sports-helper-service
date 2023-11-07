import { model, Schema, Document } from "mongoose";
import { UserModelDocumentInterface } from '../models/UserModel'
export interface EventModelInterface {
  _id?: string;
  title: string;
  content: string;
  start: string;
  date: string;
  field: string;
  participants?: Array<UserModelDocumentInterface>;
}

export type EventModelDocumentInterface = EventModelInterface & Document;

const EventSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  start: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  field: {
    type: Schema.Types.ObjectId,
    ref: 'Field',
    default: {},
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
});

export const EventModel = model<EventModelDocumentInterface>("Event", EventSchema);
