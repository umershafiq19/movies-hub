import clientPromise from '@/lib/mongodb';
import MovieCard from '@/components/MovieCard';

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db('movies-hub');
  const directors = await db.collection('directors').find({}).toArray();

  const paths = directors.map((director) => ({
    params: { id: director.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db('movies-hub');

  const director = await db.collection('directors').findOne({ id: params.id });
  const movies = await db.collection('movies').find({ directorId: params.id }).toArray();

  if (!director) {
    return { notFound: true };
  }

  return {
    props: {
      director: JSON.parse(JSON.stringify(director)),
      movies: JSON.parse(JSON.stringify(movies)),
    },
    revalidate: 10,
  };
}

export default function DirectorPage({ director, movies }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{director.name}</h1>
      <p>{director.biography}</p>

      <h2>Movies by {director.name}</h2>
      <div className="grid">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p>No movies found for this director.</p>
        )}
      </div>
    </div>
  );
}
