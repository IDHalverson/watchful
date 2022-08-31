export interface YoutubeListItemProps {
  youtubeItem: YoutubeItem;
}

export interface YoutubeItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}
