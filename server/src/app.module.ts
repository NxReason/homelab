import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/cat.entity';

const TypeOrm = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'nxr',
  password: 'secret',
  database: 'homelab',
  entities: [Cat],
  synchronize: true,
});

@Module({
  imports: [CatsModule, TypeOrm],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
