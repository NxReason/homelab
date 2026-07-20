import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepo: Repository<Cat>,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catsRepo.find();
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsRepo.save(createCatDto);
  }
}
