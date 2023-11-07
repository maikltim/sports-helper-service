import express from "express";
import jwt from "jsonwebtoken";


import { UserModel, UserModelInterface } from "../models/UserModel";
import { validationResult } from "express-validator";
import { bcryptHash } from "../utils/generateHash";
import bcrypt from "bcryptjs";
import { isValidObjectId } from "../utils/isValidObjectId";

class UserController {
  // полчучаем всех пользователей
  async getAll(_: any, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find();

      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  /// Конкретный пользователь
  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        res.status(404).send();
        return;
      }

      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  // Создаем подьзователя (при регистрации)
  async registration(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", errors: errors.array() });
        return;
      }
      let userCheckEmail = await UserModel.findOne({ email: req.body.email });
      let userCheckNickname = await UserModel.findOne({
        email: req.body.nickname,
      });
      if (!userCheckEmail && !userCheckNickname) {
        const data: UserModelInterface = {
          email: req.body.email,
          nickname: req.body.nickname,
          password: await bcryptHash(req.body.password),
          myEvents: [],
        };

        let user = await UserModel.create(data);

        res.status(200).json({
          status: "success",
          data: user,
          token: jwt.sign({ data: user }, process.env.SECRET_KEY || "123", {
            expiresIn: "30 days",
          }),
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "Registration Error",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  // Логин, отдаем токен
  async login(req: express.Request, res: express.Response): Promise<void> {
    try {
      let user = await UserModel.findOne({ email: req.body.email });
      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        res.json({
          status: "success",
          data: {
            ...user.toJSON(),
            token: jwt.sign(
              { data: req.body.user },
              process.env.SECRET_KEY || "123",
              {
                expiresIn: "30 days",
              }
            ),
          },
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "Registration Error",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      let test: any = jwt.decode(req.body.token, { complete: true });
      console.log(req.body.token);
      console.log(test);

      // if (user) {
      //   user.confirmed = true;
      //   await user.save();

      //   res.json({
      //     status: 'success',
      //     data: {
      //       ...user.toJSON(),
      //       token: jwt.sign({ data: user.toJSON() }, process.env.SECRET_KEY || '123', {
      //         expiresIn: '30 days',
      //       }),
      //     },
      //   });
      // } else {
      //   res.status(404).json({ status: 'error', message: 'Пользователь не найден' });
      // }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async updateProfile(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      let user = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { about: req.body.about, expirience: req.body.expirience },
        { new: true }
      );
      await user?.save();
      res.status(200).json({
        status: "success",
        data: user,
        token: jwt.sign({ data: user }, process.env.SECRET_KEY || "123", {
          expiresIn: "30 days",
        }),
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async addEvent(req: express.Request, res: express.Response): Promise<void> {
    try {
      let user = await UserModel.findById({ _id: req.params.id });
      if (user) {
        user = await UserModel.findByIdAndUpdate(
          { _id: req.params.id },
          { $push: { myEvents: req.body.id } },
          { new: true }
        );
        res.status(200).json({
          status: "success",
          data: user,
        });
      } else {
        res.json({
          status: "error",
          message: "Такого ивента не существует",
        });
      }
    } catch (error) {
      res.json({
        status: "error",
        errors: JSON.stringify(error),
      });
    }
  }

  async addPortrait(
    req: any,
    res: express.Response
  ): Promise<void> {
    try {
      let user = await UserModel.findById({ _id: req.params.id });

      if (user) {
        user = await UserModel.findByIdAndUpdate(
          { _id: req.params.id },
          {portrait: req.body.portrait},
          { new: true }
        );
        res.status(200).json({
          status: "success",
          data: user,
        });
      } else {
        res.json({
          status: "error",
          message: "Такого юзера не существует",
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

export const UserCtrl = new UserController();
