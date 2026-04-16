/**
 * Design tokens utility — Export for use in components
 * Provides centralized access to colors, spacing, shadows, etc.
 */

import {
  colorTokens,
  spacingTokens,
  typographyTokens,
  shadowTokens,
  radiusTokens,
  motionTokens,
} from "../theme";

export {
  colorTokens,
  spacingTokens,
  typographyTokens,
  shadowTokens,
  radiusTokens,
  motionTokens,
};

/**
 * Helper: Convert token values to sx prop format
 * Usage: getSxSpacing('lg') → { px: '16px', py: '16px' }
 */
export const getSxSpacing = (size = "md") => {
  const value = spacingTokens[size] || spacingTokens.md;
  return {
    px: value,
    py: value,
  };
};

/**
 * Helper: Common MUI sx patterns with theme tokens
 */
export const commonSx = {
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  truncateText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  truncateLines: (lines = 2) => ({
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
};

export default {
  colorTokens,
  spacingTokens,
  typographyTokens,
  shadowTokens,
  radiusTokens,
  motionTokens,
  getSxSpacing,
  commonSx,
};
