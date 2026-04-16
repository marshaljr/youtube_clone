const configuredServerUrl = import.meta.env.VITE_REACT_BACKEND_API_URL?.replace(
  /\/$/,
  "",
);

const localServerUrls = Array.from(
  { length: 11 },
  (_, index) => `http://localhost:${5000 + index}`,
);

const serverUrlCandidates = [configuredServerUrl, ...localServerUrls].filter(
  (url, index, arr) => Boolean(url) && arr.indexOf(url) === index,
);

let activeServerUrl = configuredServerUrl || null;

const fetchFromBackend = async (path) => {
  const candidateUrls = activeServerUrl
    ? [
        activeServerUrl,
        ...serverUrlCandidates.filter((url) => url !== activeServerUrl),
      ]
    : serverUrlCandidates;

  let lastError = null;

  for (const baseUrl of candidateUrls) {
    try {
      const response = await fetch(`${baseUrl}${path}`);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error ${response.status}: ${errText}`);
      }

      activeServerUrl = baseUrl;
      return response;
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(
    `Failed to fetch backend from: ${candidateUrls.join(", ")}. Last error: ${lastError?.message || "Unknown error"}`,
  );
};

// Fetch list of videos
export const fetchVideos = async ({ query = "New", pageToken = "" }) => {
  try {
    const path = `/api/videos?q=${encodeURIComponent(
      query || "New",
    )}${pageToken ? `&pageToken=${pageToken}` : ""}`;

    const response = await fetchFromBackend(path);

    const data = await response.json();
    return {
      items: data.items || [],
      nextPageToken: data.nextPageToken || null,
    };
  } catch (err) {
    console.error("fetchVideos error:", err.message);
    throw err;
  }
};

// Fetch single video details
export const fetchVideoDetail = async (videoId) => {
  if (!videoId) throw new Error("Missing video ID");

  const response = await fetchFromBackend(`/api/video/${videoId}`);

  const data = await response.json();
  return data;
};
