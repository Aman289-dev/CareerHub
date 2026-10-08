import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  job: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'applied' | 'reviewed' | 'interview' | 'rejected' | 'hired';
  appliedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    candidate: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String, trim: true },
    coverLetter: { type: String },
    status: {
      type: String,
      enum: ['applied', 'reviewed', 'interview', 'rejected', 'hired'],
      default: 'applied',
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent duplicate applications to the same job
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

export default mongoose.model<IApplication>('Application', applicationSchema);
