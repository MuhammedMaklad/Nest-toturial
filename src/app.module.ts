import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // You can add middleware or other configurations here if needed
    // ?consumer.apply(LoggerMiddleware).forRoutes('cats');
    // ?consumer.apply(LoggerMiddleware).forRoutes({ path: 'cats', method: RequestMethod.GET });
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

/*
  * The configure() method can be made asynchronous using async/await (e.g., you can await completion of an asynchronous operation inside the configure() method body).
 
  ! Middleware consumer
  * The MiddlewareConsumer is a helper class. It provides several built-in methods to manage middleware. All of them can be simply chained in the fluent style. The forRoutes() method can take a [single string, multiple strings, a RouteInfo object, a controller class and even multiple controller classes ]. In most cases you'll probably just pass a list of controllers separated by commas.
 
  ? The apply() method may either take a single middleware, or multiple arguments to specify multiple middlewares.

  ! The exclude() method supports wildcard parameters using the path-to-regexp package.

*/
