import { createTheme } from "@mui/material/styles";

/**
 * Design Tokens — Centralized visual system for bold editorial dark mode
 */

// Semantic color roles and palette
export const colorTokens = {
  // Surfaces: backgrounds and container backgrounds
  surface: {
    primary: "#000000",      // Black, highest contrast
    secondary: "#121212",    // Slightly elevated
    tertiary: "#1E1E1E",     // Card/component backgrounds
    inverse: "#FFFFFF",      // For dark text on light surfaces (rare in dark mode)
  },

  // Text: readable foreground text on dark surfaces
  text: {
    primary: "#FFFFFF",      // Primary content
    secondary: "#B3B3B3",    // Secondary/muted content
    tertiary: "#808080",     // Disabled or very subtle
    inverse: "#000000",      // Inverse text (on light backgrounds)
  },

  // Brand: accent and UI feedback
  brand: {
    primary: "#FC1503",      // YouTube red — strong, recognizable
    hover: "#E81300",        // Slightly darker for hover states
    focus: "#FF3D2E",        // Slightly brighter for focus/active states
  },

  // Semantic feedback colors
  feedback: {
    success: "#4CAF50",      // Green for success states
    error: "#F44336",        // Red for errors
    warning: "#FF9800",      // Orange for warnings
    info: "#2196F3",         // Blue for informational content
  },

  // Borders and dividers
  border: {
    default: "rgba(255,255,255,0.1)",   // Subtle dividers in dark theme
    hover: "rgba(255,255,255,0.2)",     // Slightly more prominent
    focus: "#FC1503",                   // Accent-colored focus border
  },

  // Overlay and transparency
  overlay: {
    light: "rgba(0,0,0,0.3)",
    medium: "rgba(0,0,0,0.5)",
    dark: "rgba(0,0,0,0.8)",
  },
};

// Spacing scale (4px base unit)
export const spacingTokens = {
  xs: "4px",     // 4px
  sm: "8px",     // 8px
  md: "12px",    // 12px
  lg: "16px",    // 16px
  xl: "20px",    // 20px
  xxl: "24px",   // 24px
  xxxl: "32px",  // 32px
  huge: "40px",  // 40px
  mega: "48px",  // 48px
};

// Typography scale for bold editorial direction
export const typographyTokens = {
  // Headings: strong visual hierarchy
  h1: {
    fontSize: "2.5rem",      // 40px
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: "-0.5px",
  },
  h2: {
    fontSize: "2rem",        // 32px
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "-0.25px",
  },
  h3: {
    fontSize: "1.5rem",      // 24px
    fontWeight: 700,
    lineHeight: 1.4,
  },
  // Subtitles and secondary headings
  subtitle: {
    fontSize: "1.125rem",    // 18px
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body: {
    fontSize: "1rem",        // 16px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  bodySmall: {
    fontSize: "0.875rem",    // 14px
    fontWeight: 400,
    lineHeight: 1.43,
  },
  caption: {
    fontSize: "0.75rem",     // 12px
    fontWeight: 500,
    lineHeight: 1.66,
  },
  // Button text
  button: {
    fontSize: "0.875rem",    // 14px
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
};

// Shadows for depth and elevation
export const shadowTokens = {
  sm: "0 1px 2px rgba(0,0,0,0.05)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.2)",
  xl: "0 20px 25px rgba(0,0,0,0.3)",
  inner: "inset 0 2px 4px rgba(0,0,0,0.15)",
};

// Border radius tokens for consistency
export const radiusTokens = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  round: "50%",
};

// Motion/animation durations
export const motionTokens = {
  fast: "150ms",
  base: "200ms",
  slow: "300ms",
  slower: "500ms",
};

/**
 * MUI Theme Configuration
 * Applies tokens to Material-UI through createTheme
 */
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colorTokens.brand.primary,        // #FC1503
      light: colorTokens.brand.focus,         // Lighter variant
      dark: colorTokens.brand.hover,          // Darker variant
      contrastText: colorTokens.text.inverse, // #000
    },
    secondary: {
      main: colorTokens.surface.secondary,
      contrastText: colorTokens.text.primary,
    },
    background: {
      default: colorTokens.surface.primary,    // #000
      paper: colorTokens.surface.tertiary,     // #1E1E1E for cards
    },
    text: {
      primary: colorTokens.text.primary,       // #FFF
      secondary: colorTokens.text.secondary,   // #B3B3B3
      disabled: colorTokens.text.tertiary,     // #808080
    },
    divider: colorTokens.border.default,
    action: {
      hover: colorTokens.overlay.light,
      selected: colorTokens.overlay.medium,
      focus: colorTokens.border.focus,
    },
    success: {
      main: colorTokens.feedback.success,
    },
    error: {
      main: colorTokens.feedback.error,
    },
    warning: {
      main: colorTokens.feedback.warning,
    },
    info: {
      main: colorTokens.feedback.info,
    },
  },

  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Roboto",
      '"Open Sans"',
      "sans-serif",
    ].join(","),
    h1: typographyTokens.h1,
    h2: typographyTokens.h2,
    h3: typographyTokens.h3,
    h4: typographyTokens.subtitle,
    h5: typographyTokens.bodySmall,
    h6: typographyTokens.caption,
    subtitle1: typographyTokens.subtitle,
    subtitle2: typographyTokens.bodySmall,
    body1: typographyTokens.body,
    body2: typographyTokens.bodySmall,
    caption: typographyTokens.caption,
    button: typographyTokens.button,
  },

  shape: {
    borderRadius: parseInt(radiusTokens.md),  // Default 8px
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          fontWeight: 600,
          letterSpacing: "0.5px",
          transition: `all ${motionTokens.base} ease`,
          "&:focus-visible": {
            outline: `2px solid ${colorTokens.brand.primary}`,
            outlineOffset: "2px",
          },
        },
        contained: {
          backgroundColor: colorTokens.brand.primary,
          "&:hover": {
            backgroundColor: colorTokens.brand.hover,
          },
          "&:active": {
            backgroundColor: colorTokens.brand.focus,
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `all ${motionTokens.base} ease`,
          color: colorTokens.text.primary,
          "&:hover": {
            backgroundColor: colorTokens.overlay.light,
          },
          "&:focus-visible": {
            outline: `2px solid ${colorTokens.brand.primary}`,
            outlineOffset: "2px",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colorTokens.surface.tertiary,
          borderColor: colorTokens.border.default,
          border: `1px solid ${colorTokens.border.default}`,
          transition: `all ${motionTokens.base} ease`,
          "&:hover": {
            borderColor: colorTokens.border.hover,
            transform: "translateY(-2px)",
            boxShadow: shadowTokens.lg,
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: colorTokens.surface.secondary,
            borderColor: colorTokens.border.default,
            transition: `all ${motionTokens.base} ease`,
            "&:hover": {
              borderColor: colorTokens.border.hover,
            },
            "&.Mui-focused": {
              borderColor: colorTokens.brand.primary,
              backgroundColor: colorTokens.surface.secondary,
            },
          },
          "& .MuiOutlinedInput-input": {
            color: colorTokens.text.primary,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: colorTokens.surface.secondary,
          color: colorTokens.text.primary,
          border: `1px solid ${colorTokens.border.default}`,
          transition: `all ${motionTokens.base} ease`,
          "&:hover": {
            backgroundColor: colorTokens.brand.primary,
            color: colorTokens.text.inverse,
            borderColor: colorTokens.brand.primary,
          },
        },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: colorTokens.surface.secondary,
          opacity: 0.6,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: colorTokens.brand.primary,
          textDecoration: "none",
          transition: `color ${motionTokens.base} ease`,
          "&:hover": {
            color: colorTokens.brand.focus,
            textDecoration: "underline",
          },
          "&:focus-visible": {
            outline: `2px solid ${colorTokens.brand.primary}`,
            outlineOffset: "2px",
          },
        },
      },
    },
  },
});

export default theme;
