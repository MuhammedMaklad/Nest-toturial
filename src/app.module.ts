import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './modules/cats/cats.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  // ? Controllers must always be part of a module, which is why we include the controllers array within the @Module() decorator.Since we haven’t defined any other modules apart from the root AppModule, we’ll use it to register the CatsController:
  providers: [AppService],
})
export class AppModule { }
