import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
import { Typography } from "@mui/material";
import { colorTokens, motionTokens } from "../utils/tokens";

const Categories = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { xs: "auto", md: "95%" },
      flexDirection: { xs: "row", md: "column" },
    }}>
    <div
      style={{
        overflowY: "auto",
        height: "95%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}>
      {categories.map((category) => (
        <button
          key={category.name}
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          aria-current={
            category.name === selectedCategory ? "page" : undefined
          }
          style={{
            background:
              category.name === selectedCategory
                ? colorTokens.brand.primary
                : "transparent",
            color:
              category.name === selectedCategory
                ? "white"
                : colorTokens.text.secondary,
            transition: `all ${motionTokens.base} ease`,
          }}>
          <span
            style={{
              color:
                category.name === selectedCategory
                  ? "white"
                  : colorTokens.brand.primary,
              marginRight: "12px",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}>
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
              flex: 1,
              textAlign: "left",
            }}>
            {category.name}
          </span>
        </button>
      ))}
    </div>
  </Stack>
);

export default Categories;
