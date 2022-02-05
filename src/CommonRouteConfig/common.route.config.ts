import express from 'express';
export abstract class CommonRoutesConfig {
    baseRoute: string;

    constructor( baseRoute: string) {
        this.baseRoute = baseRoute;
        this.configureRoutes();
    }
    getBaseRoute() {
        return this.baseRoute;
    }
    abstract configureRoutes();
}