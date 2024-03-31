import { Document } from "mongoose";

export interface Tweet extends Document {
  platform: string;
  platformId: string;
  content: string;
  createdAt: Date;
  hashtags: string[];
  archived: boolean;
}
