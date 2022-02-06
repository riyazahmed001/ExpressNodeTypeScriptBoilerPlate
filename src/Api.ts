import express, { Request, Response, NextFunction } from 'express';
import { ApiRouting } from './api.routing';
import { SampleMiddleWare } from './MiddleWares/sample.middleware';
import * as http from 'http';
export class Api{
    public app: express.Express;
    public port: String = '3000'
    private router: express.Router;
    
    constructor() {
        this.app = express();
        this.router = express.Router();
        this.configure();
    }

    private configure() {
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandlingMiddleWare();
    }
    private configureRoutes() {
        ApiRouting.ConfigureRouters(this.app);
    }
    private configureMiddleware() {
        this.app.use(SampleMiddleWare.myLogger);
    }
    private configureErrorHandlingMiddleWare(){
        this.app.use(this.errorHandlingMiddleWare);
    }
    public run() {
        let server = http.createServer(this.app);
        server.listen(this.port)
    }

    private errorHandlingMiddleWare(error, req: Request, res:Response, next:NextFunction){
        console.log("Error Handling Middleware called api level")
        let sampleObject = {
            "test":"Test Error Handling"
        }
        res.status(404).json(sampleObject);
}
}