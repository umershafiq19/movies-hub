import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const directors = await db.collection('directors').find({}).toArray();
  res.status(200).json(directors);
}
