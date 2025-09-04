import dotenv from 'dotenv';


dotenv.config();


const get = (key: string, fallback?: string) => {
const value = process.env[key];
if (value === undefined || value === '') {
if (fallback !== undefined) return fallback;
throw new Error(`Missing required env var: ${key}`);
}
return value;
};


export const ENV = {
NODE_ENV: get('NODE_ENV', 'development'),
PORT: parseInt(get('PORT', '5000'), 10),
MONGODB_URI: get('MONGODB_URI'),
};