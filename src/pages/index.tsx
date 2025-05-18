import { useSession } from "next-auth/react";
import Head from "next/head";
import NewsList from "../components/NewsList";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Haris News | Beranda</title>
        <meta name="description" content="Portal berita terkini dan terpercaya." />
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-bold text-center">Haris News</h1>
        </header>
        <main className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Berita Terkini</h2>
          <NewsList />
        </main>
      </div>
    </>
  );
}