import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';
import Error from './_error';

interface ITunesEpisode {
  trackId: number;
  trackName: string;
  description: string;
  episodeUrl?: string;
  releaseDate: string;
  episodeGuid?: string;
  artworkUrl600?: string;
  previewUrl?: string;
}

interface ITunesPodcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  feedUrl?: string;
  description?: string;
}

interface ChannelPageProps {
  podcast: ITunesPodcast | null;
  episodes: ITunesEpisode[];
  statusCode: number;
}

export default function ChannelPage({ podcast, episodes, statusCode }: ChannelPageProps) {
  if (statusCode !== 200 || !podcast) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout title={podcast.collectionName}>
      <div className="banner" style={{ backgroundImage: `url(${podcast.artworkUrl600})` }} />
      <h1>{podcast.collectionName}</h1>
      <h2>by {podcast.artistName}</h2>
      <p>{podcast.description}</p>
      <h2>Episodes</h2>
      <ul className="episodes">
        {episodes.map((ep) => (
          <li key={ep.trackId}>
            <Link href={`/podcast?id=${ep.trackId}`}>{ep.trackName}</Link>
            <span className="date">{new Date(ep.releaseDate).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        h2 {
          padding: 15px;
          font-size: 1.2em;
          font-weight: 600;
          margin: 0;
        }
        .episodes {
          list-style: none;
          padding: 0 15px;
        }
        .episodes li {
          margin-bottom: 1em;
        }
        .date {
          color: #888;
          margin-left: 1em;
          font-size: 0.9em;
        }
      `}</style>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ChannelPageProps> = async ({ query }) => {
  const id = query.id as string;
  try {
    const url = `https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode`;
    const req = await fetch(url);
    const data = await req.json();
    const results = data.results;
    const podcast = results[0] as ITunesPodcast;
    const episodes = results.slice(1) as ITunesEpisode[];
    return { props: { podcast, episodes, statusCode: 200 } };
  } catch (e) {
    return { props: { podcast: null, episodes: [], statusCode: 503 } };
  }
}; 