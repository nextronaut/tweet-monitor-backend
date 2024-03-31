import { Document } from 'mongoose';

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
  