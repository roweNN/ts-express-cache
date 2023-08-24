import { Schema, model, Types } from 'mongoose';
import { RequestDB } from '@src/types'

const schema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
});


export default model<RequestDB>('Request', schema);