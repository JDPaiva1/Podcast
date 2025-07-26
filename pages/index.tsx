import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error';

// iTunes Podcast type
export interface ITunesPodcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  feedUrl?: string;
}

interface HomeProps {
  podcasts: ITunesPodcast[] | null;
  statusCode: number;
}

export default function Home({ podcasts, statusCode }: HomeProps) {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout title="Podcasts">
      <ChannelGrid channels={podcasts || []} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    // Default search term for podcasts
    const term = 'technology';
    const url = `https://itunes.apple.com/search?media=podcast&term=${encodeURIComponent(term)}&limit=20`;
    const req = await fetch(url);
    const data = await req.json();
    const podcasts: ITunesPodcast[] = data.results;
    return { props: { podcasts, statusCode: 200 } };
  } catch (e) {
    return { props: { podcasts: null, statusCode: 503 } };
  }
}; 