import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any): string {
    console.log(id);
    return `This action returns a cat with id ${id}!`;
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
