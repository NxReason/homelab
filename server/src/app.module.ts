import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/cat.entity';
import { PalletesModule } from './palletes/palletes.module';
import { Pallete } from './palletes/pallete.entity';
import { FoodModule } from './food/food.module';
import { Food } from './food/food.entity';

const TypeOrm = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'nxr',
  password: 'secret',
  database: 'homelab',
  entities: [Cat, Pallete, Food],
  synchronize: true,
});

@Module({
  imports: [CatsModule, PalletesModule, FoodModule, TypeOrm],
})
export class AppModule {}
