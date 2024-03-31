import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
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

  @Get('platform/:platform')
  async findByPlatform(@Param('platform') platform: string): Promise<Anomaly[]> {
    return this.anomaliesService.findByPlatform(platform);
  }

  @Get(':id')
  async findDetectedTweet(@Param('id') id: string,) : Promise<Anomaly> {
    return this.anomaliesService.findOne(id);
  }
}
