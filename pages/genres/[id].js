import { useRouter } from 'next/router';
import MovieCard from '@/components/MovieCard';

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/genres');
  const data = await res.json();

  const paths = data.genres.map((genre) => ({
    params: { id: genre.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const genreId = params.id;

  const [moviesRes, genresRes] = await Promise.all([
    fetch('http://localhost:3000/api/movies'),
    fetch('http://localhost:3000/api/genres'),
  ]);

  const moviesData = await moviesRes.json();
  const genresData = await genresRes.json();

  const genre = genresData.genres.find((g) => g.id === genreId);
  const filteredMovies = moviesData.movies.filter((m) => m.genreId === genreId);

  return {
    props: {
      genre: genre || null,
      movies: filteredMovies,
    },
    revalidate: 10,
  };
}

export default function GenrePage({ genre, movies }) {
  const router = useRouter();

  if (!genre) {
    return <p>Genre not found</p>;
  }

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
