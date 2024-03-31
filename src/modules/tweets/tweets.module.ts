import { Module } from '@nestjs/common';
import { tweetsProvider } from './tweets.provider';
import { DatabaseModule } from '../../database/database.module';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { UtilsModule } from 'src/utils/utils.module';
import { AnomaliesModule } from '../anomalies/anomalies.module';

@Module({
  imports: [DatabaseModule, AnomaliesModule, UtilsModule],
  controllers: [TweetsController],
  providers: [TweetsService, ...tweetsProvider],
})
export class TweetsModule {}
