import React from "react";
import Link from "next/link";
import { ITunesPodcast } from "../pages";

interface ChannelGridProps {
  channels: ITunesPodcast[];
}

export default function ChannelGrid({ channels }: ChannelGridProps) {
  if (!channels || channels.length === 0) {
    return <div>No podcasts found.</div>;
  }
  return (
    <div className="channels">
      {channels.map((podcast) => (
        <Link key={podcast.collectionId} href={`/channel?id=${podcast.collectionId}`} className="channel">
          <img src={podcast.artworkUrl600} alt={podcast.collectionName} width="160" height="160" />
          <h2>{podcast.collectionName}</h2>
          <h3>{podcast.artistName}</h3>
        </Link>
      ))}
      <style jsx>{`
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        .channel {
          display: block;
          margin-bottom: 0.5em;
          color: #333;
          text-decoration: none;
        }
        .channel img {
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 160px;
          height: auto;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
        h3 {
          padding: 5px;
          font-size: 0.8em;
          font-weight: 400;
          margin: 0;
          text-align: center;
          color: #666;
        }
      `}</style>
    </div>
  );
}
