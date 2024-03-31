import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { Tweet } from './interfaces/tweet.interface';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Controller('api/tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  async create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto);
  }

  @Get()
  async findAll(): Promise<Tweet[]> {
    return this.tweetsService.findAll();
  }
  
  @Get('detected/tweet')
  async findDetectedTweet(@Query('platform') platform: string, @Query('platformId') platformId: string) : Promise<Tweet> {
    return this.tweetsService.findDetectedTweet(platform, platformId)
  }

  @Get('detected/tweets')
  async findDetectedTweets(@Query('startDate') startDate: string, @Query('endDate') endDate: string) : Promise<Tweet[]> {
    return this.tweetsService.findDetectedTweets(startDate, endDate)
  }

  @Get(':platform')
  async findByPlatform(@Param('platform') platform: string): Promise<Tweet[]> {
    return this.tweetsService.findByPlatform(platform);
  }

}
