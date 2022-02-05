import express, { Request, Response, NextFunction, Router } from 'express';
import { CommonRoutesConfig } from '../CommonRouteConfig/common.route.config';
import { SampleMiddleWare } from '../MiddleWares/sample.middleware';

export class SampleController extends CommonRoutesConfig {
    
    public static route: string = '/sample';
    public router: Router;

    constructor() {
        
        super(SampleController.route);
    }

    configureRoutes() {
        this.router = Router();
        this.router.get('/test1',this.testMethodOne);
        this.router.get('/test2',this.testMethodTwo);
    }
    public testMethodOne(request: Request, respones:Response, next:NextFunction) {
        let sampleObject = {
            "test":"Test String"
        }
        respones.status(200).json(sampleObject);
    }

    public testMethodTwo(request: Request, respones:Response, next:NextFunction) {
        let sampleObject = {
            "test":"Test String"
        }
        respones.status(200).json(sampleObject);
    }
}


