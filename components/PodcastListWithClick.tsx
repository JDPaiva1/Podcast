import React from 'react';
import slug from '../helpers/slug';
import { Podcast } from '../types';
import Link from 'next/link';

interface PodcastListWithClickProps {
  podcasts: Podcast[];
  onClickPodcast: (event: React.MouseEvent<HTMLAnchorElement>, podcast: Podcast) => void;
}

export default function PodcastListWithClick({ podcasts, onClickPodcast }: PodcastListWithClickProps) {
  return (
    <div>
      {podcasts.map((podcast) => (
        <Link
          key={podcast.id}
          href={`/${slug(podcast.channel.title)}.${podcast.channel.id}/${slug(podcast.title)}.${podcast.id}`}
          legacyBehavior
        >
          <a
            className='podcast'
            onClick={(event) => onClickPodcast(event, podcast)}
          >
            <h3>{podcast.title}</h3>
            <div className='meta'>
              {Math.ceil(podcast.duration / 60)} minutes
            </div>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .podcast {
          display: block;
          text-decoration: none;
          color: #333;
          padding: 15px;
          border-bottom: 1px solid rgba(0,0,0,0.2);
          cursor: pointer;
        }
        .podcast:hover {
          color: #000;
        }
        .podcast h3 {
          margin: 0;
        }
        .podcast .meta {
          color: #666;
          margin-top: 0.5em;
          font-size: 0.8em;
        }
      `}</style>
    </div>
  );
} 