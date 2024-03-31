import { Module, forwardRef } from '@nestjs/common';
import { anomaliesProvider } from './anomalies.provider';
import { DatabaseModule } from '../../database/database.module';
import { AnomaliesService } from './anomalies.service';
import { UtilsModule } from 'src/utils/utils.module';
import { AnomaliesController } from './anomalies.controller';
import { TweetsModule } from '../tweets/tweets.module';

@Module({
  imports: [DatabaseModule, UtilsModule, forwardRef(() => TweetsModule)],
  controllers: [AnomaliesController],
  providers: [AnomaliesService, ...anomaliesProvider],
  exports: [AnomaliesService]
})
export class AnomaliesModule {}
