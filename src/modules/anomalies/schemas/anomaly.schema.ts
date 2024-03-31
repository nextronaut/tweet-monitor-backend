import * as mongoose from 'mongoose';

export const AnomalySchema = new mongoose.Schema({
    platform: String,
    startId: String,
    startDate: Date,
    endId: String,
    endDate: Date,
    tweets: Number,
    createdAt: Date,
    shiftTimeAverage: Number,
    period: Number,
  });
  