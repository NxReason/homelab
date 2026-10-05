import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PalletesModule } from './palletes/palletes.module';
import { FoodModule } from './food/food.module';

const TypeOrm = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'nxr',
  password: 'secret',
  database: 'homelab',
  autoLoadEntities: true,
  synchronize: true,
});

@Module({
  imports: [CatsModule, PalletesModule, FoodModule, TypeOrm],
})
export class AppModule {}
