import { Document } from 'mongoose';

export interface Article extends Document {
  id: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  author: string;
}
