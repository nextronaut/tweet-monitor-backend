import { Controller, Get, Post, Body, Param, Sse } from '@nestjs/common';
import { AnomaliesService } from './anomalies.service';
import { CreateAnomalyDto } from './dto/create-anomaly.dto';
import { Anomaly, AnomalyWithTweets } from './interfaces/anomaly.interface';
import { Observable, interval, map, switchMap } from 'rxjs';
import { MessageEvent } from './interfaces/messageevent.interface';

@Controller('api/anomalies')
export class AnomaliesController {
  constructor(private readonly anomaliesService: AnomaliesService) {}

  @Post()
  async create(@Body() createAnomalyDto: CreateAnomalyDto) {
    return this.anomaliesService.create(createAnomalyDto);
  }

  @Sse('sse/:platform')
  sse(@Param('platform') platform: string): Observable<MessageEvent> {
    return interval(10000).pipe(
      switchMap(() => this.anomaliesService.findLatest(platform)),
      map(anomalies => ({ data: { anomalies } }))
    );
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
  async findDetectedAnomaly(@Param('id') id: string,) : Promise<AnomalyWithTweets> {
    return this.anomaliesService.findOne(id);
  }
}
