export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`);
  const genres = await res.json();

  return {
    props: { genres },
  };
}

export default function GenresPage({ genres }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Genres</h1>
      <GenreList genres={genres} />
    </div>
  );
}
