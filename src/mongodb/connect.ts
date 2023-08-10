import mongoose from 'mongoose';

export async function connect(): Promise<void> {
  if (mongoose?.connection?.db) {
    return;
  }
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster-0-findcaster.htfcn5l.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`
  );
}
