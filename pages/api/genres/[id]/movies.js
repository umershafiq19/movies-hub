import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const { id } = req.query;
  const genre = await db.collection('genres').findOne({ id });
  if (!genre) return res.status(404).json({ error: 'Genre not found' });
  const movies = await db.collection('movies').find({ genreId: id }).toArray();
  res.status(200).json({ genre, movies });
}