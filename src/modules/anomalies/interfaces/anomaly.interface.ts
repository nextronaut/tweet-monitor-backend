import { Document } from 'mongoose';
import { Tweet } from 'src/modules/tweets/interfaces/tweet.interface';

export interface Anomaly extends Document {
  platform: string;
  startId: string;
  startDate: Date;
  endId: string;
  endDate: Date;
  createdAt: Date;
  tweets: number;
  shiftTimeAverage: number;
  period: number;
}
  
export interface AnomalyWithTweets {
  anomaly: Anomaly;
  tweets: Tweet[];
}