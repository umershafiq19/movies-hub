import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const director = await db.collection('directors').findOne({ id });
  const movies = await db.collection('movies').find({ directorId: id }).toArray();
  if (!director) return res.status(404).json({ error: 'Director not found' });
  res.status(200).json({ ...director, movies });
}