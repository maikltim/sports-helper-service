import express from "express";
import { FieldModel, FieldModelInterface } from "../models/FieldModel";

import { EventModelInterface, EventModel } from "../models/EventModel";

class FieldsController {
  // получаем все поля
  async getAll(_: any, res: express.Response): Promise<void> {
    try {
      const fields = await FieldModel.find();

      res.json({
        status: "success",
        data: fields,
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
      const data: FieldModelInterface = {
        title: req.body.title,
        content: req.body.content,
        address: req.body.address,
        events: [],
        pictures: ['https://thumbs.dreamstime.com/b/streetball-field-bright-sunny-day-55082514.jpg', 'https://media.npr.org/assets/img/2016/03/29/ap_090911089838_sq-3271237f28995f6530d9634ff27228cae88e3440.jpg', 'https://centrsporta-nevskiy.ru/wp-content/uploads/2020/12/xmrebgrit_c.jpg'],
      };

      let field = await FieldModel.create(data);
      res.status(200).json({
        status: "success",
        data: field,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async addEvent(req: express.Request, res: express.Response): Promise<void> {
    try {
      let fieldId = req.params.id;
      const field = await FieldModel.findById(fieldId);

      const data: EventModelInterface = {
        title: req.body.title,
        content: req.body.content,
        start: req.body.start,
        date: req.body.date,
        field: req.body.fieldId,
      };

      let event = await EventModel.create(data);

      field?.events.push(event._id);

      await field?.save();

      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

}

export const FieldCtrl = new FieldsController();
