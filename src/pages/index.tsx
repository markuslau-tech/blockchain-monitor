import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Blockchain Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main />
    </>
  );
}
