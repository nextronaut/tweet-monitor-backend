import { Mongoose } from 'mongoose';
import { TweetSchema } from './schemas/tweet.schema';

export const tweetsProvider = [
  {
    provide: 'TWEET_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Tweet', TweetSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
