import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { colorTokens, commonSx } from "../utils/tokens";

const VideoCard = ({ video }) => {
  const videoId = video.id.videoId || video.id;
  const snippet = video?.snippet;
  const videoTitle = snippet?.title || demoVideoTitle;
  const channelTitle = snippet?.channelTitle || demoChannelTitle;
  const cardAriaLabel = `${videoTitle} by ${channelTitle}. Click to watch video.`;

  return (
    <Card
      component="article"
      aria-label={cardAriaLabel}
      tabIndex={0}
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 1,
        backgroundColor: colorTokens.surface.tertiary,
        border: `1px solid ${colorTokens.border.default}`,
        overflow: "hidden",
        transition: `all 0.2s ease`,
        "&:hover": {
          borderColor: colorTokens.border.hover,
          transform: "translateY(-4px)",
          boxShadow: `0 8px 16px ${colorTokens.overlay.medium}`,
        },
        "&:focus-visible": {
          outline: `2px solid ${colorTokens.brand.primary}`,
          outlineOffset: "2px",
        },
      }}>
      <Link to={`/video/${video.id.videoId || videoId}`}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={videoTitle}
          sx={{
            width: { xs: "100%", sm: "358px" },
            height: 180,
            display: "block",
            backgroundColor: colorTokens.overlay.dark,
          }}
        />
      </Link>
      <CardContent
        sx={{
          backgroundColor: colorTokens.surface.tertiary,
          height: "106px",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "&:last-child": {
            paddingBottom: "12px",
          },
        }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            variant="subtitle2"
            fontWeight="600"
            color={colorTokens.text.primary}
            sx={{
              ...commonSx.truncateLines(2),
              fontSize: "0.875rem",
              lineHeight: "1.4",
              marginBottom: "4px",
            }}>
            {videoTitle}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet.channelId}`
              : demoChannelUrl
          }>
          <Typography
            variant="caption"
            sx={{
              ...commonSx.flexCenter,
              gap: "4px",
              color: colorTokens.text.secondary,
              fontSize: "0.75rem",
              "&:hover": {
                color: colorTokens.text.primary,
              },
            }}>
            {channelTitle}
            <Tooltip title="Verified channel" arrow>
              <CheckCircleIcon
                sx={{
                  fontSize: "12px",
                  color: colorTokens.text.secondary,
                  flexShrink: 0,
                }}
              />
            </Tooltip>
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
