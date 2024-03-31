import { Module, forwardRef } from '@nestjs/common';
import { tweetsProvider } from './tweets.provider';
import { DatabaseModule } from '../../database/database.module';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { UtilsModule } from 'src/utils/utils.module';
import { AnomaliesModule } from '../anomalies/anomalies.module';

@Module({
  imports: [DatabaseModule, UtilsModule, forwardRef(() => AnomaliesModule)],
  controllers: [TweetsController],
  providers: [TweetsService, ...tweetsProvider],
  exports: [TweetsService]
})
export class TweetsModule {}
