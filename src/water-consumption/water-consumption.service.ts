import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';  // Adicione Between aqui
import { WaterConsumption } from './entities/water-consumption.entity';
import { CreateConsumptionDto } from './dto/create-consumption.dto';

@Injectable()
export class WaterConsumptionService {
  constructor(
    @InjectRepository(WaterConsumption)
    private waterConsumptionRepository: Repository<WaterConsumption>,
  ) {}

  async create(createConsumptionDto: CreateConsumptionDto): Promise<WaterConsumption> {
    const consumption = this.waterConsumptionRepository.create(createConsumptionDto);
    return this.waterConsumptionRepository.save(consumption);
  }

  async findAllByUserId(userId: string, startDate: Date, endDate: Date): Promise<WaterConsumption[]> {
    return this.waterConsumptionRepository.find({
      where: { userId, date: Between(startDate, endDate) },
    });
  }

  async checkAlerts(userId: string): Promise<string[]> {
    const consumptions = await this.waterConsumptionRepository.find({
      where: { userId },
      order: { date: 'DESC' },
      take: 2,
    });

    if (consumptions.length < 2) return [];

    const lastMonth = consumptions[1].amount;
    const currentMonth = consumptions[0].amount;

    if (currentMonth > lastMonth) {
      return [`Alerta: Consumo elevado em relação ao mês passado!`];
    }

    return [];
  }
}
