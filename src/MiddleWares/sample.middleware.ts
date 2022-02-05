var express = require('express')

export class SampleMiddleWare {
    public static myLogger = function (req, res, next) {
        console.log('LOGGED')
        next();
    }
}
