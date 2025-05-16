import MovieCard from '@/components/MovieCard';

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/directors');
  const data = await res.json();

  const paths = data.directors.map((director) => ({
    params: { id: director.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const directorId = params.id;

  const [directorsRes, moviesRes] = await Promise.all([
    fetch('http://localhost:3000/api/directors'),
    fetch('http://localhost:3000/api/movies'),
  ]);

  const directorsData = await directorsRes.json();
  const moviesData = await moviesRes.json();

  const director = directorsData.directors.find((d) => d.id === directorId);
  const movies = moviesData.movies.filter((m) => m.directorId === directorId);

  if (!director) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      director,
      movies,
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
