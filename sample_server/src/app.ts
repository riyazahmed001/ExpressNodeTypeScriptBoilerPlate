import express, { Request, Response, NextFunction, Router } from 'express';
import {Api} from './Api';

const app = new Api();
app.run();

console.log("App is started")