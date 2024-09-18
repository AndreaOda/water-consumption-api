import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterConsumptionModule } from './water-consumption/water-consumption.module';
import { WaterConsumption } from './water-consumption/entities/water-consumption.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'water-consumption.db',
      entities: [WaterConsumption],
      synchronize: true,
    }),
    WaterConsumptionModule,
  ],
})
export class AppModule {}
