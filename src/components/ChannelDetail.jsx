import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Skeleton, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { fetchVideos } from "../utils/fetchFromAPI";
import { Videos, ChannelCard, SkeletonCard, ErrorState } from "./";
import { colorTokens } from "../utils/tokens";

const ChannelDetail = () => {
  const { id } = useParams();

  // Fetch channel details
  const {
    data: channelData,
    isLoading: loadingChannel,
    error: channelError,
    refetch: refetchChannel,
  } = useQuery({
    queryKey: ["channelDetail", id],
    queryFn: () => fetchVideos(`channels?part=snippet&id=${id}`),
    staleTime: 1000 * 60,
  });

  // Fetch videos of the channel
  const {
    data: videosData,
    isLoading: loadingVideos,
    error: videosError,
    refetch: refetchVideos,
  } = useQuery({
    queryKey: ["channelVideos", id],
    queryFn: () =>
      fetchVideos(`search?channelId=${id}&part=snippet%2Cid&order=date`),
    staleTime: 1000 * 60,
  });

  // Error state
  if (channelError || videosError) {
    return (
      <Box sx={{ p: 3, backgroundColor: colorTokens.surface.primary, minHeight: "95vh" }}>
        <ErrorState
          message="Failed to load channel data. Please try again."
          onRetry={() => {
            if (channelError) refetchChannel();
            if (videosError) refetchVideos();
          }}
        />
      </Box>
    );
  }

  const channelDetail = channelData?.items[0];
  const videos = videosData?.items || [];

  return (
    <Box sx={{ minHeight: "95vh", backgroundColor: colorTokens.surface.primary }}>
      <Box>
        {/* Channel Header Banner */}
        {loadingChannel ? (
          <Skeleton
            variant="rectangular"
            height={300}
            sx={{
              backgroundColor: colorTokens.overlay.light,
            }}
          />
        ) : (
          <div
            style={{
              height: "300px",
              background: `linear-gradient(135deg, ${colorTokens.brand.primary}, ${colorTokens.overlay.dark})`,
              zIndex: 10,
              position: "relative",
            }}
          />
        )}

        {/* Channel Card or Skeleton */}
        {loadingChannel ? (
          <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
            <SkeletonCard variant="channel" />
          </Box>
        ) : (
          <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
        )}
      </Box>

      {/* Channel Videos */}
      <Box
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}>
        <Box sx={{ mr: { sm: "100px" } }} />

        {/* Loading State */}
        {loadingVideos && (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Content State */}
        {!loadingVideos && videos.length > 0 && (
          <Videos videos={videos} />
        )}

        {/* Empty State */}
        {!loadingVideos && videos.length === 0 && (
          <Typography sx={{ color: colorTokens.text.secondary }}>
            This channel has no videos yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
