import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedJob extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const savedJobSchema = new Schema<ISavedJob>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  },
  { timestamps: true }
);

// Prevent duplicate saves
savedJobSchema.index({ user: 1, job: 1 }, { unique: true });

export default mongoose.model<ISavedJob>('SavedJob', savedJobSchema);
