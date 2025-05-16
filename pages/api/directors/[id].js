import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const { id } = req.query;
  const director = await db.collection('directors').findOne({ id });
  if (!director) return res.status(404).json({ error: 'Director not found' });
  const movies = await db.collection('movies').find({ directorId: id }).toArray();
  res.status(200).json({ director, movies });
}