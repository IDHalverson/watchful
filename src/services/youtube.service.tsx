const host = import.meta.env.DEV ? "http://localhost:8080" : "";

const YOUTUBE_SEARCH_URL = "/youtube-search";
const YOUTUBE_COMMENTS_URL = "/youtube-comments";

export const searchYoutube = async (query: string, sort: string) => {
  let url = `${host}${YOUTUBE_SEARCH_URL}`;
  url += `?q=${query}`;
  url += sort ? `&order=${sort.toLowerCase()}` : "";
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseAsJson = await response.json();
  return responseAsJson?.data?.content || [];
};

export const getTotalComments = async (videoId: string) => {
  const response = await fetch(
    `${host}${YOUTUBE_COMMENTS_URL}?videoId=${videoId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseAsJson = await response.json();
  return responseAsJson?.data?.content?.[0]?.statistics?.commentCount ?? null;
};
