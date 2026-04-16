import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchVideos } from "../utils/fetchFromAPI";
import { Videos, SkeletonCard, ErrorState } from "./";
import { colorTokens } from "../utils/tokens";

const SearchFeed = () => {
  const { searchTerm } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["searchResults", searchTerm],
    queryFn: () => fetchVideos({ query: searchTerm }), //backend handles query
    staleTime: Infinity,
    enabled: !!searchTerm, // only run query if searchTerm exists
  });

  const videos = data?.items || [];

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        minHeight: "95vh",
        backgroundColor: colorTokens.surface.primary,
      }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          color: colorTokens.text.primary,
          mb: 3,
          ml: { xs: 1, sm: 0, md: 2 },
        }}>
        Search Results for{" "}
        <span style={{ color: colorTokens.brand.primary }}>{searchTerm}</span>{" "}
        videos
      </Typography>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ mr: { sm: "100px" } }} />

        {/* Loading State */}
        {isLoading && (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorState
            message="Failed to load search results. Please try again."
            onRetry={() => refetch()}
          />
        )}

        {/* Content State */}
        {!isLoading && !error && videos.length > 0 && (
          <Videos videos={videos} />
        )}

        {/* Empty State */}
        {!isLoading && !error && videos.length === 0 && (
          <Typography sx={{ color: colorTokens.text.secondary, ml: 2 }}>
            No results found for "{searchTerm}"
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchFeed;
