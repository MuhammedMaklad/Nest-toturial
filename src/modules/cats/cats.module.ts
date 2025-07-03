import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // Exporting CatsService if needed in other modules
})

export class CatsModule { }
