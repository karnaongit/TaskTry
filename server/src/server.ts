import app from './app';
import { connectDB } from './config/db';
import { ENV } from './config/env';


async function bootstrap() {
await connectDB();
app.listen(ENV.PORT, () => {
console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
});
}


bootstrap().catch((err) => {
console.error('Failed to start server:', err);
process.exit(1);
});