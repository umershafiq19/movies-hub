import clientPromise from '@/lib/mongodb';
// inside getStaticProps, getServerSideProps, or API route
const { MongoClient } = await import('mongodb');

export default async function handler(req, res) {
  const { id } = req.query;

  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const client = await clientPromise;
    const db = client.db('movies-hub');
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });

    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    res.status(200).json(movie);
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
