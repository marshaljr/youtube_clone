import { Stack, Box, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import MobileDrawer from "./MobileDrawer";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { colorTokens, motionTokens } from "../utils/tokens";

const Navbar = ({
  searchTerm,
  setSearchTerm,
  mainRef,
  selectedCategory = null,
  onSelectCategory = null,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on Feed → just scroll
      if (window.innerWidth < 900) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        mainRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (location.pathname.startsWith("/video")) {
      // On video detail → go home, then scroll
      navigate("/");
      setTimeout(() => {
        if (window.innerWidth < 900) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          mainRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate("/");
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleCategorySelect = (categoryName) => {
    onSelectCategory?.(categoryName);
    handleDrawerClose();
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        p={3}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: colorTokens.surface.primary,
          borderBottom: `1px solid ${colorTokens.border.default}`,
          justifyContent: "space-between",
          zIndex: 10,
          transition: `all ${motionTokens.base} ease`,
        }}>
        {/* Hamburger Button — Mobile Only */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerOpen}
            aria-label="Open menu"
            sx={{
              color: colorTokens.text.primary,
              transition: `all ${motionTokens.base} ease`,
              "&:hover": {
                backgroundColor: colorTokens.overlay.light,
              },
              "&:focus-visible": {
                outline: `2px solid ${colorTokens.brand.primary}`,
                outlineOffset: "2px",
              },
            }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Box
          component="a"
          href="/"
          onClick={handleLogoClick}
          aria-label="YouTube Clone Home"
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            transition: `transform ${motionTokens.base} ease`,
            flex: isMobile ? 1 : "auto",
            justifyContent: isMobile ? "center" : "flex-start",
            "&:hover": {
              transform: "scale(1.05)",
            },
            "&:focus-visible": {
              outline: `2px solid ${colorTokens.brand.primary}`,
              outlineOffset: "2px",
              borderRadius: "4px",
            },
          }}>
          <img src={logo} alt="YouTube Clone logo" height={45} />
        </Box>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Stack>

      {/* Mobile Drawer for Categories */}
      {isMobile && (
        <MobileDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}
    </>
  );
};

export default Navbar;
