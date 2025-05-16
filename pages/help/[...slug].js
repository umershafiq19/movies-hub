export async function getStaticPaths() {
  return {
    paths: [], // no pre-rendered paths at build time
    fallback: 'blocking', // will server-render pages on first request
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      params: params || {},
    },
  };
}

export default function HelpPage({ params }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Help - {params?.slug?.join(' / ') || 'Home'}</h1>
      <p>Content for {params?.slug?.join(' / ') || 'Help Home'} will go here.</p>
    </div>
  );
}
