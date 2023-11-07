import express from 'express'
import {
  MarkModel,
  MarkModelInterface,
} from "../models/MarkModel";
import { FieldModelDocumentInterface } from '../models/FieldModel'

class MarksController {

  // получаем все метки
  async getAll(_: any, res: express.Response): Promise<void> {
    try {
      const marks = await MarkModel.find();

      res.json({
        status: "success",
        data:marks,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  // создание метки 
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {

      const data: MarkModelInterface = {
        lat: req.body.lat,
        lng: req.body.lng,
        info:req.body.info,
        field: req.body.field as FieldModelDocumentInterface,
      };

      let mark = await MarkModel.create(data);

      res.status(200).json({
        status: "success",
        data: mark,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  // удаление метки
  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {

      let currentMark = await MarkModel.findOne({ _id: req.body.id })

      if (currentMark) {
        await MarkModel.findByIdAndDelete({ _id: req.body.id })
        res.status(200).json({
          status: "success",
        });
      } else {
        res.json({
          status: "error",
          message: 'Такой метки не существует',
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


export const MarkCtrl = new MarksController();
