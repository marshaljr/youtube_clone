import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { colorTokens, motionTokens } from "../utils/tokens";

/**
 * ErrorState — User-friendly error display with Retry action
 * Replaces raw error text with actionable UI
 */
const ErrorState = ({ message, onRetry, icon: CustomIcon = ErrorOutlineIcon }) => {
  return (
    <Stack
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 3,
        minHeight: "200px",
        textAlign: "center",
        backgroundColor: colorTokens.overlay.light,
        borderRadius: 1,
        border: `1px solid ${colorTokens.border.default}`,
      }}>
      {/* Error Icon */}
      <CustomIcon
        aria-hidden="true"
        sx={{
          fontSize: "3rem",
          color: colorTokens.feedback.error,
          opacity: 0.7,
        }}
      />

      {/* Error Message */}
      <Typography
        component="h2"
        variant="h6"
        sx={{
          color: colorTokens.text.primary,
          fontWeight: 600,
        }}>
        Oops, something went wrong
      </Typography>

      {/* Error Details */}
      <Typography
        variant="body2"
        role="status"
        sx={{
          color: colorTokens.text.secondary,
          maxWidth: "400px",
        }}>
        {message || "We encountered an error while loading. Please try again."}
      </Typography>

      {/* Retry Button */}
      {onRetry && (
        <Button
          onClick={onRetry}
          aria-label="Retry loading content"
          variant="contained"
          color="primary"
          size="medium"
          sx={{
            mt: 1,
            transition: `all ${motionTokens.base} ease`,
            "&:focus-visible": {
              outline: `2px solid ${colorTokens.brand.primary}`,
              outlineOffset: "2px",
            },
            "&:hover": {
              transform: "translateY(-2px)",
            },
          }}>
          Retry
        </Button>
      )}
    </Stack>
  );
};

export default ErrorState;
