import { Module } from '@nestjs/common';
import { anomaliesProvider } from './anomalies.provider';
import { DatabaseModule } from '../../database/database.module';
import { AnomaliesService } from './anomalies.service';
import { UtilsModule } from 'src/utils/utils.module';
import { AnomaliesController } from './anomalies.controller';

@Module({
  imports: [DatabaseModule, UtilsModule],
  controllers: [AnomaliesController],
  providers: [AnomaliesService, ...anomaliesProvider],
  exports: [AnomaliesService]
})
export class AnomaliesModule {}
