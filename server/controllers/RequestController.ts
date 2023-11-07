import express from 'express'
import {
  RequestModel,
  RequestModelInterface,
} from "../models/RequestModel";

class RequestController {

  // получаем все запросы
  async getAll(_: any, res: express.Response): Promise<void> {
    try {
      const requests = await RequestModel.find();

      res.json({
        status: "success",
        data:requests,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  // создание запроса
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {  
      const data: RequestModelInterface = {
        lat: req.body.lat,
        lng: req.body.lng,
        fieldTitle:req.body.fieldTitle,
        fieldContent: req.body.fieldContent,
        fieldAddress:req.body.fieldAddress,
      };

      let request = await RequestModel.create(data);
      
      res.status(200).json({
        status: "success",
        data: request,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  // удаление запроса
  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      let request = await RequestModel.findOne({_id:req.body.id})
      
      if (request) {
        await RequestModel.findByIdAndDelete({_id:req.body.id})
        res.status(200).json({
          status: "success",
          data: req.body.id,
        });
      } else {
        res.json({
          status: "error",
          message: 'Такого запроса не существует',
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


export const RequestCtrl = new RequestController();
