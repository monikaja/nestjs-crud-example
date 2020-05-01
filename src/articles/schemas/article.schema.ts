import * as mongoose from 'mongoose';

export const ArticlesSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  body: {type: String, required: true},
  createdAt: {type: String, required: true},
  author: {type: String, required: true}
});
