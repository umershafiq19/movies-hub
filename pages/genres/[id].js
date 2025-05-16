import clientPromise from '@/lib/mongodb';
import MovieCard from '@/components/MovieCard';

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db('movies-hub');

  const genres = await db.collection('genres').find({}).toArray();

  const paths = genres.map((genre) => ({
    params: { id: genre.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db('movies-hub');

  const genre = await db.collection('genres').findOne({ id: params.id });
  const movies = await db.collection('movies').find({ genreId: params.id }).toArray();

  return {
    props: {
      genre: genre ? JSON.parse(JSON.stringify(genre)) : null,
      movies: JSON.parse(JSON.stringify(movies)),
    },
    revalidate: 10,
  };
}

export default function GenrePage({ genre, movies }) {
  if (!genre) return <p>Genre not found</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{genre.name} Movies</h1>
      <div className="grid">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p>No movies found in this genre.</p>
        )}
      </div>
    </div>
  );
}
