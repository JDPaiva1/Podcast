import React from "react";

export interface Channel {
  id: number;
  title: string;
  urls: {
    logo_image: {
      original: string;
    };
    banner_image?: {
      original: string;
    };
  };
}

export interface Podcast {
  id: number;
  title: string;
  duration: number;
  channel: Channel;
  urls: {
    image?: string;
    high_mp3: string;
  };
}

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export interface ChannelGridProps {
  channels: Channel[];
}

export interface PodcastListProps {
  podcasts: Podcast[];
}

export interface PodcastPlayerProps {
  clip: Podcast;
  onClose?: () => void;
}

export interface ErrorProps {
  statusCode: number;
}
