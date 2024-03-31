import { Document } from "mongoose";

export class Tweet extends Document {
  readonly platform: string;
  readonly  platformId: string;
  readonly  content: string;
  readonly  createdAt: Date;
  readonly hashtags: string[];
}
