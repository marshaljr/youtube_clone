import React from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";
import { colorTokens } from "../utils/tokens";

/**
 * SkeletonCard — Loading placeholder for video/channel cards
 * Matches VideoCard dimensions and provides visual feedback during fetch
 */
const SkeletonCard = ({ variant = "video" }) => {
  if (variant === "channel") {
    return (
      <Card
        component="article"
        aria-busy="true"
        aria-label="Loading channel information"
        role="status"
        sx={{
          width: { xs: "100%", sm: "356px", md: "320px" },
          borderRadius: 1,
          backgroundColor: colorTokens.surface.tertiary,
          border: `1px solid ${colorTokens.border.default}`,
        }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "24px",
          }}>
          {/* Profile Picture Skeleton */}
          <Skeleton
            variant="circular"
            width={180}
            height={180}
            sx={{ mb: 2 }}
          />
          {/* Title Skeleton */}
          <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
          {/* Subscriber Count Skeleton */}
          <Skeleton variant="text" width="60%" height={16} />
        </CardContent>
      </Card>
    );
  }

  // Default video card skeleton
  return (
    <Card
      component="article"
      aria-busy="true"
      aria-label="Loading video information"
      role="status"
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        borderRadius: 1,
        backgroundColor: colorTokens.surface.tertiary,
        border: `1px solid ${colorTokens.border.default}`,
        overflow: "hidden",
      }}>
      {/* Thumbnail Skeleton */}
      <Skeleton
        aria-hidden="true"
        variant="rectangular"
        width="100%"
        height={180}
        sx={{ backgroundColor: colorTokens.overlay.light }}
      />
      <CardContent
        sx={{
          backgroundColor: colorTokens.surface.tertiary,
          padding: "12px",
        }}>
        {/* Title Skeleton — 2 lines */}
        <Box sx={{ mb: 1 }}>
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="85%" height={16} />
        </Box>
        {/* Channel Name Skeleton */}
        <Skeleton variant="text" width="60%" height={14} />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
