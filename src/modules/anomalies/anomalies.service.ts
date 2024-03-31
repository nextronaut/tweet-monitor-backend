import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateAnomalyDto } from "./dto/create-anomaly.dto";
import { Anomaly, AnomalyWithTweets } from "./interfaces/anomaly.interface";
import { MockDataService } from "src/utils/mock.service";
import { TweetsService } from "../tweets/tweets.service";

@Injectable()
export class AnomaliesService {
  constructor(
    private readonly mockDataService: MockDataService,
    @Inject(forwardRef(() => TweetsService)) private readonly tweetsService: TweetsService,
    @Inject("ANOMALY_MODEL") private readonly anomalyModel: Model<Anomaly>
  ) {}

  async create(createAnomalyDto: CreateAnomalyDto): Promise<Anomaly> {
    const createdCat = this.anomalyModel.create(createAnomalyDto);
    return createdCat;
  }

  async analyze(
    platform: string,
    tweets: any[],
    period: number
  ): Promise<Anomaly> {
    const recentItem: any = this.mockDataService.getRecentItem(tweets);
    const lastItem: any = this.mockDataService.getLastItem(tweets);
    const shiftTimeAverage: number =
      (recentItem.createdAt.getTime() - lastItem.createdAt.getTime()) /
      tweets.length;
    const newAnomaly: any = {
      platform: platform,
      startId: lastItem.platformId.toString(),
      startDate: lastItem.createdAt,
      endId: recentItem.platformId.toString(),
      endDate: recentItem.createdAt,
      tweets: tweets.length,
      period: period,
      createdAt: new Date(),
      shiftTimeAverage: shiftTimeAverage,
    };
    return await this.anomalyModel.create(newAnomaly);
  }

  async findByPlatform(platform: string): Promise<Anomaly[]> {
    return this.anomalyModel.find({platform:platform});
  }

  async findOne(id: string): Promise<AnomalyWithTweets> {
    const anomaly = await this.anomalyModel.findById(id);
    const detectedTweets = await this.tweetsService.findDetectedTweets(anomaly.platform, anomaly.startDate, anomaly.endDate)
    return {anomaly: anomaly, tweets: detectedTweets}
  }

  async findLatest(platform: string): Promise<Anomaly[]> {
    return this.anomalyModel.find({platform: platform}).limit(10).exec();
  }

  async findAll(): Promise<Anomaly[]> {
    return this.anomalyModel.find().sort({ createdAt: -1 }).exec();
  }
}
