import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Tooltip, Skeleton, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useQuery } from "@tanstack/react-query";

import { Videos, SkeletonCard, ErrorState } from "./";
import { fetchVideoDetail, fetchVideos } from "../utils/fetchFromAPI";
import { colorTokens, commonSx } from "../utils/tokens";

const VideoDetail = ({ mainRef }) => {
  const { id } = useParams();

  const { data: videoDetail, isLoading: loadingDetail, error: detailError, refetch: refetchDetail } = useQuery({
    queryKey: ["videoDetail", id],
    queryFn: () => fetchVideoDetail(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  const { data: relatedVideosData = { items: [] }, isLoading: loadingRelated, error: relatedError } = useQuery({
    queryKey: ["relatedVideos", id],
    queryFn: () => fetchVideos({ relatedToVideoId: id }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  // Show error state if detail fetch fails
  if (detailError && !loadingDetail) {
    return (
      <Box sx={{ p: 3, backgroundColor: colorTokens.surface.primary, minHeight: "95vh" }}>
        <ErrorState
          message="Failed to load video details. Please try again."
          onRetry={() => refetchDetail()}
        />
      </Box>
    );
  }

  // Show loading skeleton for detail
  if (loadingDetail) {
    return (
      <Box
        sx={{
          minHeight: "95vh",
          backgroundColor: colorTokens.surface.primary,
        }}>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ gap: 2 }}>
          <Box sx={{ flex: { xs: 1, md: "1 1 65%" }, p: 2 }}>
            {/* Player Skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ borderRadius: 1, mb: 2 }}
            />
            {/* Title Skeleton */}
            <Skeleton variant="text" width="100%" height={32} sx={{ mb: 1 }} />
            {/* Metadata Skeleton */}
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
          {/* Sidebar Skeletons */}
          <Box sx={{ flex: { xs: 1, md: "1 1 35%" }, p: 2 }}>
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Grid item xs={12} key={`related-skeleton-${i}`}>
                  <SkeletonCard />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (!videoDetail || !videoDetail?.snippet) {
    return (
      <Box sx={{ p: 3, backgroundColor: colorTokens.surface.primary, minHeight: "95vh" }}>
        <ErrorState
          message="Video not found or is no longer available."
          onRetry={() => refetchDetail()}
        />
      </Box>
    );
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box
      sx={{
        minHeight: "95vh",
        backgroundColor: colorTokens.surface.primary,
      }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ gap: { xs: 0, md: 2 } }}>
        {/* Video Player and Metadata */}
        <Box
          sx={{
            flex: { xs: 1, md: "1 1 65%" },
            display: "flex",
            flexDirection: "column",
          }}>
          {/* Player Container */}
          <Box
            sx={{
              width: "100%",
              position: "relative",
              paddingTop: "56.25%",
              backgroundColor: colorTokens.overlay.dark,
            }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </Box>

          {/* Video Metadata */}
          <Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
            <Typography
              variant="h5"
              sx={{
                color: colorTokens.text.primary,
                fontWeight: 700,
                mb: 1,
                ...commonSx.truncateLines(3),
              }}>
              {title}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              sx={{
                color: colorTokens.text.primary,
                mt: 1,
                gap: { xs: 1, sm: 0 },
              }}>
              <Link to={`/channel/${channelId}`}>
                <Typography
                  sx={{
                    color: colorTokens.text.primary,
                    fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    "&:hover": {
                      color: colorTokens.brand.primary,
                    },
                  }}>
                  {channelTitle}
                  <Tooltip title="Verified channel" arrow>
                    <CheckCircleIcon
                      sx={{
                        fontSize: "14px",
                        color: colorTokens.brand.primary,
                        flexShrink: 0,
                      }}
                    />
                  </Tooltip>
                </Typography>
              </Link>

              <Stack
                direction="row"
                gap={{ xs: 2, md: 3 }}
                alignItems="center"
                sx={{ width: { xs: "100%", sm: "auto" } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: colorTokens.text.secondary,
                  }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: colorTokens.text.secondary,
                  }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* Related Videos Sidebar */}
        <Box
          sx={{
            flex: { xs: 1, md: "1 1 35%" },
            px: { xs: 2, md: 1 },
            py: { xs: 2, md: 1 },
            maxHeight: { md: "calc(100vh - 120px)" },
            overflowY: { md: "auto" },
          }}>
          {relatedError && !loadingRelated ? (
            <Typography sx={{ color: colorTokens.text.secondary, textAlign: "center" }}>
              Failed to load related videos
            </Typography>
          ) : loadingRelated ? (
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Grid item xs={12} key={`related-skeleton-${i}`}>
                  <SkeletonCard />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Videos
              videos={relatedVideosData.items || []}
              direction="column"
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
