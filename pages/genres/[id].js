export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`);
  const genres = await res.json();

  const paths = genres.map((genre) => ({ params: { id: genre.id } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`);
  const allGenres = await res1.json();

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres/${params.id}/movies`);
  const movies = await res2.json();

  const genre = allGenres.find((g) => g.id === params.id);
  if (!genre) return { notFound: true };

  return {
    props: {
      genreName: genre.name,
      movies,
    },
    revalidate: 10,
  };
}

export default function GenreMoviesPage({ genreName, movies }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{genreName} Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
