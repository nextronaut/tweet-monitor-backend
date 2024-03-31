import { Injectable } from "@nestjs/common";
import { faker } from "@faker-js/faker";

@Injectable()
export class MockDataService {
  monitorHashtag(hashtag: string, platform: string): any[] {
    const tweets: any[] = [];
    const batchSize: number = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    const now: Date = new Date();
    const future: Date = new Date(now.getTime() + 10000);
    for (let i = 0; i < batchSize; i++) {
      const newTweet: any = {
        platformId: faker.string.uuid(),
        platform: platform,
        content: faker.lorem.sentences(),
        createdAt: faker.date.between({ from: now, to: future }),
        hashtags: [hashtag],
      };
      tweets.push(newTweet);
    }
    return tweets;
  }

  getRecentItem(tweets: any[]): any {
    return tweets.reduce((maxItem: any, currentItem: any): any => {
      if (!maxItem || currentItem.createdAt > maxItem.createdAt) {
        return currentItem;
      }
      return maxItem;
    }, null);
  }
  getLastItem(tweets: any[]): any {
    return tweets.reduce((minItem: any, currentItem: any): any => {
      if (!minItem || currentItem.createdAt < minItem.createdAt) {
        return currentItem;
      }
      return minItem;
    }, null);
  }
}
