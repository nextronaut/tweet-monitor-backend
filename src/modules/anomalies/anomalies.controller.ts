import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AnomaliesService } from './anomalies.service';
import { CreateAnomalyDto } from './dto/create-anomaly.dto';
import { Anomaly } from './interfaces/anomaly.interface';

@Controller('api/anomalies')
export class AnomaliesController {
  constructor(private readonly anomaliesService: AnomaliesService) {}

  @Post()
  async create(@Body() createAnomalyDto: CreateAnomalyDto) {
    return this.anomaliesService.create(createAnomalyDto);
  }

  @Get()
  async findAll(): Promise<Anomaly[]> {
    return this.anomaliesService.findAll();
  }

  @Get(':platform')
  async findByPlatform(@Param('platform') platform: string): Promise<Anomaly[]> {
    return this.anomaliesService.findByPlatform(platform);
  }
}
