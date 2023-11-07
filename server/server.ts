import dotenv from 'dotenv';
dotenv.config();

import { RequestCtrl } from './controllers/RequestController'
import { EventCtrl } from './controllers/EventController'
import { FieldCtrl } from './controllers/FieldController'
import { UserCtrl } from './controllers/UserController';
import { MarkCtrl } from './controllers/MarksController'
import express from 'express'

import './core/db';


const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', UserCtrl.getAll)
app.get('/users/:id', UserCtrl.show);

app.put('/users/:id/pic', UserCtrl.addPortrait)
app.post('/users/registration', UserCtrl.registration)
app.post('/users/login', UserCtrl.login);
app.post('/users/verify', UserCtrl.verify);
app.put('/users/:id', UserCtrl.updateProfile)
app.patch('/users/:id', UserCtrl.addEvent)

app.get('/marks', MarkCtrl.getAll)
app.post('/marks', MarkCtrl.create )
app.delete('/marks', MarkCtrl.delete )

app.get('/fields', FieldCtrl.getAll )
app.post('/field', FieldCtrl.create)
app.post('/field/:id/events', FieldCtrl.addEvent)

app.get('/events', EventCtrl.getAll)
app.post('/events', EventCtrl.create)
app.patch('/events/:id', EventCtrl.join )
app.put('/events/:id', EventCtrl.leave)
app.get('/field/:id/events',EventCtrl.getFieldEvents )

app.get('/requests', RequestCtrl.getAll)
app.post('/requests', RequestCtrl.create)
app.delete('/requests', RequestCtrl.delete)

app.listen(process.env.PORT, (): void => {
    console.log('server runned on: ',process.env.PORT);
    
})
