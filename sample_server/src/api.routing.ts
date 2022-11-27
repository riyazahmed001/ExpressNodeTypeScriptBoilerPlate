import * as express from 'express';
import { SampleController } from './controllers/sample.controller';


export class ApiRouting {
    public static ConfigureRouters(app: express.Router) {
        let controllers = [
            { name:SampleController, router: new SampleController().router }
        ];

        for(let controller=0;controller < controllers.length; controller++) {
            let currentController = controllers[controller];
            app.use(currentController["name"].route, currentController.router);
        }
    }
}