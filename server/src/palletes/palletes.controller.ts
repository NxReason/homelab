import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PalletesService } from './palletes.service';
import { Pallete } from './pallete.entity';
import { CreatePalleteDto, UpdatePalleteDto } from './pallete.dto';

@Controller('api/palletes')
export class PalletesController {
  constructor(private palletesService: PalletesService) {}

  @Get()
  readAll(): Promise<Pallete[]> {
    return this.palletesService.readAll();
  }

  @Get(':id')
  async readOne(@Param('id') id: number): Promise<Pallete> {
    const pallete = await this.palletesService.readOne(id);

    if (!pallete) {
      throw new NotFoundException('Pallete not found');
    }

    return pallete;
  }

  @Post()
  create(@Body() createPalleteDto: CreatePalleteDto): Promise<Pallete> {
    return this.palletesService.create(createPalleteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    updatePalleteDto: UpdatePalleteDto,
  ): Promise<Pallete> {
    const pallete = await this.palletesService.update(updatePalleteDto);
    if (!pallete) {
      throw new NotFoundException('Pallete not found');
    }
    return pallete;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Pallete> {
    const pallete = await this.palletesService.delete(id);
    if (!pallete) throw new NotFoundException('Pallete not found');
    return pallete;
  }
}
