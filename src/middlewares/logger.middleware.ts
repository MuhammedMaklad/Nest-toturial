import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] -> ${method} - ${url} - ${req.path}`);

    // Call the next middleware or route handler
    next();
  }
}
/*
  ! Functional middleware#
  * The LoggerMiddleware class we've been using is quite simple. It has no members, no additional methods, and no dependencies. Why can't we just define it in a simple function instead of a class? In fact, we can.This type of middleware is called functional middleware.Let's transform the logger middleware from class-based into functional middleware to illustrate the difference:
 * Consider using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.


  * consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

  ! Note 
  * Accessing the DI container in a global middleware is not possible. You can use a functional middleware instead when using app.use(). Alternatively, you can use a class middleware and consume it with .forRoutes('*') within the AppModule (or any other module).
*/
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};