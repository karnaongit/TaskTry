import mongoose, { Schema, Document, Model } from 'mongoose';


export interface ITeam extends Document {
name: string;
email: string;
designation: string;
createdAt: Date;
updatedAt: Date;
}


const TeamSchema = new Schema<ITeam>(
{
name: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
designation: { type: String, required: true, trim: true },
},
{ timestamps: true }
);


TeamSchema.index({ email: 1 }, { unique: true });
TeamSchema.index({ name: 'text', email: 'text', designation: 'text' });


export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', TeamSchema);