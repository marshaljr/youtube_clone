import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useQuery } from "@tanstack/react-query";

import { Videos, Loader } from "./";
import { fetchVideoDetail, fetchVideos } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();

  const { data: videoDetail, isLoading: loadingDetail } = useQuery({
    queryKey: ["videoDetail", id],
    queryFn: () => fetchVideoDetail(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  const { data: relatedVideosData = { items: [] } } = useQuery({
    queryKey: ["relatedVideos", id],
    queryFn: () => fetchVideos({ relatedToVideoId: id }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  if (loadingDetail) return <Loader />;
  if (!videoDetail || !videoDetail?.snippet)
    return <Typography color="red">Video not found</Typography>;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{ width: "100%", position: "relative", paddingTop: "56.25%" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </Box>

          <Box px={2} py={2}>
            <Typography color="#fff" variant="h5" fontWeight="bold">
              {title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ color: "#fff", mt: 1 }}>
              <Link to={`/channel/${channelId}`}>
                <Typography
                  color="#fff"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    display: "flex",
                    alignItems: "center",
                  }}>
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: 0.5 }}
                  />
                </Typography>
              </Link>

              <Stack direction="row" gap={2.5} alignItems="center">
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box px={2} py={{ md: 1, xs: 5 }}>
          <Videos videos={relatedVideosData.items || []} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
