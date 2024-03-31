import { Module } from '@nestjs/common';
import { MockDataService } from './mock.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MockDataService],
  exports: [MockDataService],
})
export class UtilsModule {}
