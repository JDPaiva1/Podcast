import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Error from './_error';

interface ITunesEpisode {
  trackId: number;
  trackName: string;
  description: string;
  releaseDate: string;
  artworkUrl600?: string;
  previewUrl?: string;
  episodeUrl?: string;
  collectionId?: number;
}

interface PodcastPageProps {
  episode: ITunesEpisode | null;
  statusCode: number;
}

export default function PodcastPage({ episode, statusCode }: PodcastPageProps) {
  if (statusCode !== 200 || !episode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div>
      <header>Podcast Episode</header>
      <div className='modal'>
        <div className='clip'>
          <nav>
            {episode.collectionId && (
              <Link href={`/channel?id=${episode.collectionId}`}>← Back to Podcast</Link>
            )}
          </nav>
          <picture>
            {episode.artworkUrl600 && (
              <div style={{ backgroundImage: `url(${episode.artworkUrl600})`, width: '100%', height: 200, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            )}
          </picture>
          <div className='player'>
            <h3>{episode.trackName}</h3>
            <div className='meta'>
              <span>{new Date(episode.releaseDate).toLocaleDateString()}</span>
            </div>
            <p>{episode.description}</p>
            {episode.previewUrl && (
              <audio controls autoPlay={false} style={{ width: '100%' }}>
                <source src={episode.previewUrl} type='audio/mpeg' />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        nav {
          background: none;
          margin-bottom: 1em;
        }
        nav a {
          display: inline-block;
          padding: 15px;
          color: #8756ca;
          cursor: pointer;
          text-decoration: none;
        }
        .clip {
          display: flex;
          height: 100%;
          flex-direction: column;
          background: #fff;
          color: #222;
        }
        picture {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1;
          flex-direction: column;
          width: auto;
          padding: 10%;
        }
        .player {
          padding: 30px;
          background: rgba(0,0,0,0.03);
          text-align: center;
        }
        h3 {
          margin: 0;
        }
        .meta {
          color: #888;
          margin: 1em 0;
        }
        audio {
          margin-top: 2em;
          width: 100%;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          background: rgba(255,255,255,0.98);
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PodcastPageProps> = async ({ query }) => {
  const id = query.id as string;
  try {
    const url = `https://itunes.apple.com/lookup?id=${id}`;
    const req = await fetch(url);
    const data = await req.json();
    const episode = data.results[0] as ITunesEpisode;
    return { props: { episode, statusCode: 200 } };
  } catch (e) {
    return { props: { episode: null, statusCode: 503 } };
  }
}; 