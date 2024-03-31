import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TweetsModule } from './modules/tweets/tweets.module';
import { AnomaliesModule } from './modules/anomalies/anomalies.module';

@Module({
  imports: [ScheduleModule.forRoot(), AnomaliesModule, TweetsModule ],
})
export class AppModule {}
