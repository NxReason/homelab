import { Injectable } from '@nestjs/common';
import { Pallete } from './pallete.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePalleteDto, UpdatePalleteDto } from './pallete.dto';

@Injectable()
export class PalletesService {
  constructor(
    @InjectRepository(Pallete)
    private palleteRepo: Repository<Pallete>,
  ) {}

  readAll(): Promise<Pallete[]> {
    return this.palleteRepo.find();
  }

  readOne(id: number): Promise<Pallete | null> {
    return this.palleteRepo.findOneBy({ id });
  }

  create(createPalleteDto: CreatePalleteDto): Promise<Pallete> {
    return this.palleteRepo.save(createPalleteDto);
  }

  async update(updatePalleteDto: UpdatePalleteDto): Promise<Pallete | null> {
    const updPallete = await this.palleteRepo.findOneBy({
      id: updatePalleteDto.id,
    });

    if (!updPallete) return null;

    updPallete.name = updatePalleteDto.name;

    return this.palleteRepo.save(updPallete);
  }

  async delete(id: number): Promise<Pallete | null> {
    const delPallete = await this.palleteRepo.findOneBy({ id });

    if (!delPallete) return null;

    return this.palleteRepo.remove(delPallete);
  }
}
