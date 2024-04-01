export class CreateAnomalyDto {
  readonly platform: string;
  readonly startId: string;
  readonly startDate: Date;
  readonly endId: string;
  readonly endDate: Date;
  readonly createdAt: Date;
  readonly tweets: number;
  readonly shiftTimeAverage: number;
  readonly period: number;
}
