import mongoose, { Schema, Document, Model } from 'mongoose';
import { ITeam } from './Team';


export interface IProject extends Document {
name: string;
description: string;
teamMembers: mongoose.Types.ObjectId[]; 
createdAt: Date;
updatedAt: Date;
}


const ProjectSchema = new Schema<IProject>(
{
name: { type: String, required: true, trim: true },
description: { type: String, required: true, trim: true },
teamMembers: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
},
{ timestamps: true }
);


ProjectSchema.index({ name: 'text', description: 'text' });


export const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);