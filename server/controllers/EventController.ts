import express from 'express'
import {
  EventModel,
  EventModelInterface,
} from "../models/EventModel";

class EventsController {

   // получаем все ивенты
   async getAll(_: any, res: express.Response): Promise<void> {
    try {
      const events = await EventModel.find();

      res.json({
        status: "success",
        data:events,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      
      const data: EventModelInterface = {
        title: req.body.title,
        content: req.body.content,
        start: req.body.start,
        date: req.body.date,
        field: req.body.fieldId,
      };

      let event = await EventModel.create(data);
  
      res.status(200).json({
        status: "success",
        data: event,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async getFieldEvents(req: express.Request, res: express.Response): Promise<void> {
    try {
      const events = await EventModel.find({field:req.params.id});

      res.json({
        status: "success",
        data:events,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async join (req: express.Request, res: express.Response): Promise<void> {
    try {
      let currentEvent = await EventModel.findOne({ _id: req.params.id })
      if (currentEvent) {
        currentEvent = await EventModel.findByIdAndUpdate({ _id: req.params.id }, {$push: {participants: req.body.id}}, {new:true})
        res.status(200).json({
          status: "success",
          data:currentEvent,
        });
      } else {
        res.json({
          status: "error",
          message: 'Такого ивента не существует',
        });
      }
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
   }

   async leave (req: express.Request, res: express.Response): Promise<void> {
    try {
      let currentEvent = await EventModel.findOne({ _id: req.params.id })
      if (currentEvent) {
        let newPart = currentEvent.participants?.filter(el => el != req.body.id)
        currentEvent = await EventModel.findByIdAndUpdate(req.params.id, {participants:newPart}, {new:true}) 
        res.status(200).json({
          status: "success",
          data:currentEvent,
        });
      } else {
        res.json({
          status: "error",
          message: 'Такого ивента не существует',
        });
      }
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
   } 
}


export const EventCtrl = new EventsController();
