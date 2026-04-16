import { useNavigate } from "react-router-dom";
import { Paper, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { colorTokens, motionTokens } from "../utils/tokens";

const SearchBar = ({ style }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((searchTerm || "").trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "stretch",
        borderRadius: "24px",
        border: `1px solid ${colorTokens.border.default}`,
        backgroundColor: colorTokens.surface.secondary,
        boxShadow: "none",
        mr: { xs: 1, sm: 5 },
        width: { xs: "200px", sm: "280px", md: "350px" },
        height: "40px",
        transition: `all ${motionTokens.base} ease`,
        "&:focus-within": {
          borderColor: colorTokens.brand.primary,
          backdropFilter: "blur(4px)",
        },
        "&:hover": {
          borderColor: colorTokens.border.hover,
        },
      }}>
      <label htmlFor="search-input" style={{ display: "none" }}>
        Search videos by title or keywords
      </label>
      <input
        id="search-input"
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchTerm || ""}
        onChange={(e) => setSearchTerm(e.target.value || "")}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          color: colorTokens.text.primary,
          fontSize: "14px",
          padding: "8px 12px",
          fontFamily: "inherit",
        }}
        aria-label="Search videos"
      />
      <IconButton
        type="submit"
        aria-label="Search"
        sx={{
          p: "8px",
          color: colorTokens.brand.primary,
          transition: `all ${motionTokens.base} ease`,
          "&:hover": {
            backgroundColor: colorTokens.overlay.light,
            color: colorTokens.brand.focus,
          },
          "&:focus-visible": {
            outline: `2px solid ${colorTokens.brand.primary}`,
            outlineOffset: "-4px",
          },
        }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
