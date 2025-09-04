import mongoose, { Schema, Document, Model } from 'mongoose';
import { IProject } from './Project';
import { ITeam } from './Team';


export type TaskStatus = 'to-do' | 'in-progress' | 'done' | 'cancelled';


export interface ITask extends Document {
title: string;
description: string;
deadline: Date;
project: IProject['_id'];
assignedMembers: ITeam['_id'][];
status: TaskStatus;
createdAt: Date;
updatedAt: Date;
}


const TaskSchema = new Schema<ITask>(
{
title: { type: String, required: true, trim: true },
description: { type: String, required: true, trim: true },
deadline: { type: Date, required: true },
project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
assignedMembers: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
status: { type: String, enum: ['to-do', 'in-progress', 'done', 'cancelled'], default: 'to-do' },
},
{ timestamps: true }
);


TaskSchema.index({ title: 'text', description: 'text' });


export const Task: Model<ITask> = mongoose.model<ITask>('Task', TaskSchema);