import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const movies = await db.collection('movies').find({ genreId: id }).toArray();
  res.status(200).json(movies);
}