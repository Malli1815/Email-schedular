import mongoose from 'mongoose';

export interface IEmail extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  recipient: string;
  subject: string;
  body: string;
  status: 'SCHEDULED' | 'SENT' | 'FAILED';
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const emailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'SENT', 'FAILED'],
    default: 'SCHEDULED',
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

export const Email = mongoose.model<IEmail>('Email', emailSchema);
