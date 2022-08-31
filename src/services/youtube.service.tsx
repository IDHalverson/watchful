const host = import.meta.env.DEV ? "http://localhost:8080" : "";

const YOUTUBE_SEARCH_URL = "/youtube-search";

export const searchYoutube = async (query: string) => {
  return [];
  // const response = await fetch(`${host}${YOUTUBE_SEARCH_URL}?q=${query}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const responseAsJson = await response.json();
  // return responseAsJson?.data?.content || [];
};
