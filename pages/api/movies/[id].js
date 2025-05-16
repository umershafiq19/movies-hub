// pages/api/movies/[id].js
import clientPromise from '@/lib/mongodb'; // your MongoDB connection helper

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const movie = await db.collection('movies').findOne({ id });

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.status(200).json(movie);
}
