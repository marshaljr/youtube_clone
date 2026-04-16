import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { categories } from "../utils/constants";
import { colorTokens, motionTokens } from "../utils/tokens";

/**
 * MobileDrawer — Category navigation for mobile/tablet
 * Triggered by hamburger button in Navbar when < 900px
 */
const MobileDrawer = ({ open, onClose, selectedCategory, onSelectCategory }) => {
  const handleCategoryClick = (categoryName) => {
    onSelectCategory(categoryName);
    onClose(); // Close drawer after selection
  };

  return (
    <Drawer
      role="navigation"
      aria-label="Mobile navigation menu"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: colorTokens.surface.primary,
          borderRight: `1px solid ${colorTokens.border.default}`,
          width: "280px",
        },
      }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: `1px solid ${colorTokens.border.default}`,
        }}>
        <Typography
          component="h2"
          variant="h6"
          sx={{
            fontWeight: 700,
            color: colorTokens.text.primary,
          }}>
          Categories
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close menu"
          sx={{
            color: colorTokens.text.primary,
            "&:hover": {
              backgroundColor: colorTokens.overlay.light,
            },
          }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Category List */}
      <List 
        role="menubar"
        sx={{ padding: 0 }}>
        {categories.map((category) => (
          <ListItem
            key={category.name}
            role="menuitem"
            aria-current={category.name === selectedCategory ? "page" : undefined}
            button
            onClick={() => handleCategoryClick(category.name)}
            selected={category.name === selectedCategory}
            sx={{
              padding: "12px 16px",
              backgroundColor:
                category.name === selectedCategory
                  ? colorTokens.overlay.light
                  : "transparent",
              borderLeft:
                category.name === selectedCategory
                  ? `4px solid ${colorTokens.brand.primary}`
                  : "4px solid transparent",
              transition: `all ${motionTokens.base} ease`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: colorTokens.overlay.light,
              },
              "&:focus-visible": {
                outline: `2px solid ${colorTokens.brand.primary}`,
                outlineOffset: "-2px",
              },
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color:
                  category.name === selectedCategory
                    ? colorTokens.brand.primary
                    : colorTokens.text.secondary,
              }}>
              {category.icon}
            </Box>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight:
                  category.name === selectedCategory ? 600 : 500,
                color:
                  category.name === selectedCategory
                    ? colorTokens.text.primary
                    : colorTokens.text.secondary,
              }}>
              {category.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileDrawer;
