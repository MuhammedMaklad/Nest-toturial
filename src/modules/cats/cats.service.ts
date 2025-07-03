import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./cats.dto";


@Injectable()
export class CatsService {
  private readonly cats: CreateCatDto[] = [];

  create(cat: CreateCatDto) {
    this.cats.push(cat);
  }

  findAll(): CreateCatDto[] {
    return this.cats;
  }

  findOne(name: string): CreateCatDto | undefined {
    return this.cats.find(cat => cat.name === name);
  }
}