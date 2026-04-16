import React from "react";
import { Box, CardContent, CardMedia, Typography, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";
import { colorTokens, commonSx } from "../utils/tokens";

const ChannelCard = ({ channelDetail, marginTop }) => {
  const channelId = channelDetail?.id?.channelId || channelDetail?.id;
  const channelName = channelDetail?.snippet?.title || "Channel";
  const subscriberCount = parseInt(
    channelDetail?.statistics?.subscriberCount || 0,
    10,
  ).toLocaleString("en-US");

  return (
    <Box
      component="article"
      aria-label={`${channelName} channel with ${subscriberCount} subscribers. Click to view channel.`}
      role="region"
      sx={{
        boxShadow: `0 4px 12px ${colorTokens.overlay.medium}`,
        borderRadius: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "100%", sm: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop,
        backgroundColor: colorTokens.surface.tertiary,
        border: `1px solid ${colorTokens.border.default}`,
        transition: `all 0.2s ease`,
        "&:hover": {
          borderColor: colorTokens.border.hover,
          transform: "translateY(-4px)",
          boxShadow: `0 8px 20px ${colorTokens.overlay.dark}`,
        },
        "&:focus-visible": {
          outline: `2px solid ${colorTokens.brand.primary}`,
          outlineOffset: "2px",
        },
      }}>
      <Link
        to={`/channel/${channelId}`}
        aria-label={`View ${channelName} channel`}
        style={{ textDecoration: "none", width: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: colorTokens.text.primary,
            width: "100%",
            padding: "24px",
          }}>
          <CardMedia
            component="img"
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={`${channelName} profile picture`}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: `3px solid ${colorTokens.brand.primary}`,
              backgroundColor: colorTokens.overlay.light,
              flexShrink: 0,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              ...commonSx.flexCenter,
              gap: "6px",
              color: colorTokens.text.primary,
              fontWeight: 700,
              marginBottom: "8px",
              fontSize: "1rem",
            }}>
            {channelName}
            <Tooltip title="Verified channel" arrow>
              <CheckCircleIcon
                sx={{
                  fontSize: "16px",
                  color: colorTokens.brand.primary,
                  flexShrink: 0,
                }}
              />
            </Tooltip>
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: colorTokens.text.secondary,
              }}>
              {subscriberCount} subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
