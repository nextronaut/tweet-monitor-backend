export class CreateTweetDto {
  platform: string;
  platformId: string;
  content: string;
  createdAt: Date;
  hashtags: string[];
  archived: boolean;
}
