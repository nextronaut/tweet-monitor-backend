import * as mongoose from 'mongoose';

export const TweetSchema = new mongoose.Schema({
  platform: String,
  platformId: String,
  content: String,
  createdAt: Date,
  hashtags: [String],
  archived: Boolean,
});