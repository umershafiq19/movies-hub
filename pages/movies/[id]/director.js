import clientPromise from '@/lib/mongodb';

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const directors = await db.collection('directors').find({}).toArray();

  const paths = directors.map((director) => ({
    params: { id: director.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db('movies-hub');

  const director = await db.collection('directors').findOne({ id: params.id });
  if (!director) return { notFound: true };

  const movies = await db.collection('movies').find({ directorId: params.id }).toArray();

  return {
  props: {
    director: {
      ...director,
      _id: director._id.toString(), // ✅ Fix serialization issue
      movies: JSON.parse(JSON.stringify(movies)), // already fine
    },
  },
  revalidate: 10,
};

}

export default function DirectorPage({ director }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{director.name}</h1>
      <p>{director.biography}</p>
      <h2 className="text-xl mt-6 font-semibold">Movies Directed:</h2>
      <ul className="list-disc ml-6">
        {director.movies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
