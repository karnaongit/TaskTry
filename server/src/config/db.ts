import mongoose from 'mongoose';
import { ENV } from './env';


export async function connectDB() {
mongoose.set('strictQuery', true);
await mongoose.connect(ENV.MONGODB_URI);
console.log('✅ MongoDB connected');
}