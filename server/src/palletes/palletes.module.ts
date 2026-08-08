import { Module } from '@nestjs/common';
import { PalletesController } from './palletes.controller';
import { PalletesService } from './palletes.service';
import { Pallete } from './pallete.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pallete])],
  controllers: [PalletesController],
  providers: [PalletesService],
})
export class PalletesModule {}
