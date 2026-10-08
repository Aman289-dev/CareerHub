import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  requirements?: string[];
  company: mongoose.Types.ObjectId;
  postedBy: mongoose.Types.ObjectId;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  remoteType: 'remote' | 'on-site' | 'hybrid';
  status: 'open' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    requirements: [{ type: String, trim: true }],
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, trim: true },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    experienceLevel: { type: String, trim: true },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      required: true,
    },
    remoteType: {
      type: String,
      enum: ['remote', 'on-site', 'hybrid'],
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

// Text index for search functionality
jobSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IJob>('Job', jobSchema);
