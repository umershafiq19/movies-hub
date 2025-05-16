// ✅ /pages/api/movies/[id].js
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const { id } = req.query;
  const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.status(200).json({ movie });
}