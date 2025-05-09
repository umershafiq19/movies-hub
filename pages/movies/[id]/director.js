
export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/directors/${params.id}`);
  const data = await res.json();

  if (!data || data.error) return { notFound: true };

  return {
    props: { director: data },
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
