import MovieCard from '@/components/MovieCard';
export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/movies'); // ✅ direct URL (not process.env) for static build
    const movies = await res.json();

    return {
      props: { movies: movies.slice(0, 5) }, // Top 5 trending
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      props: { movies: [] },
    };
  }
}


export default function Home({ movies }) {
  if (!movies || !Array.isArray(movies)) {
    return <div className="p-8 text-red-600">Failed to load movies.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Trending Movies  </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

