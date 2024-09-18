import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { WaterConsumptionService } from './water-consumption.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';

@Controller('water-consumption')
export class WaterConsumptionController {
  constructor(private readonly waterConsumptionService: WaterConsumptionService) {}

  @Post()
  async create(@Body() createConsumptionDto: CreateConsumptionDto) {
    return this.waterConsumptionService.create(createConsumptionDto);
  }

  @Get('history')
  async getHistory(@Query('userId') userId: string, @Query('start') start: string, @Query('end') end: string) {
    return this.waterConsumptionService.findAllByUserId(userId, new Date(start), new Date(end));
  }

  @Get('alerts')
  async checkAlerts(@Query('userId') userId: string) {
    return this.waterConsumptionService.checkAlerts(userId);
  }
}
