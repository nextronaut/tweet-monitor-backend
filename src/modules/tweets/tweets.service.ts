import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Model } from "mongoose";
import { Tweet } from "./interfaces/tweet.interface";
import { CreateTweetDto } from "./dto/create-tweet.dto";
import { Interval } from "@nestjs/schedule";
import { MockDataService } from "src/utils/mock.service";
import { AnomaliesService } from "../anomalies/anomalies.service";

@Injectable()
export class TweetsService {

  constructor(
    private readonly mockDataService: MockDataService,
    @Inject(forwardRef(() => AnomaliesService)) private readonly anomalyDetectService: AnomaliesService,
    @Inject("TWEET_MODEL") private readonly tweetModel: Model<Tweet>,
  ) {}

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const createdTweet = this.tweetModel.create(createTweetDto);
    return createdTweet;
  }

  // @Interval(10000)
  monitoringTweets() {
    const tweets = this.mockDataService.monitorHashtag('#favorite', 'youtube');
    this.tweetModel.insertMany(tweets);
    this.anomalyDetectService.analyze('youtube', tweets, 10000);
  }

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.find().exec();
  }

  async findByPlatform(platform: string): Promise<Tweet[]> {
    return this.tweetModel.find({platform:platform});
  }

  async findDetectedTweet(platform: string, platformId: string): Promise<Tweet> {
    return this.tweetModel.findOne({platform: platform, platformId: platformId})
  }

  async findDetectedTweets(platform: string, startDate: Date, endDate: Date): Promise<Tweet[]> {
    return this.tweetModel.find({
      platform: platform,
      createdAt: {$gte: startDate, $lte: endDate}
    });
  }
}
