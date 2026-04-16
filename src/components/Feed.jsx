import { Box, Stack, Typography, Grid } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchVideos } from "../utils/fetchFromAPI";
import { Videos, Sidebar, Loader, SkeletonCard, ErrorState } from "./";
import { useDebounce } from "../hooks/Debounce";
import { useRef, useState, useEffect } from "react";
import { colorTokens } from "../utils/tokens";

const Feed = ({ mainRef }) => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [searchTerm, setSearchTerm] = useState("");

  const debounceSearchTerm = useDebounce(searchTerm, 1500);
  const query = debounceSearchTerm || selectedCategory;

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["videos", query],
    queryFn: ({ pageParam = "" }) =>
      fetchVideos({ query, pageToken: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    staleTime: 1000 * 60 * 5,
    enabled: !!query,
  });
  const allVideos = data?.pages?.flatMap((page) => page.items) || [];

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const node = loadMoreRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: colorTokens.surface.primary,
        minHeight: "100vh",
      }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          width: { md: "12rem", xs: "100%" },
          borderRight: `1px solid ${colorTokens.border.default}`,
          px: { xs: 0, md: 2 },
          position: "sticky",
          top: 0,
          height: "100vh",
        }}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            setSearchTerm("");
            if (cat === "New") {
              mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: colorTokens.text.secondary,
            textAlign: "center",
            mt: 2,
            mb: 6,
          }}>
          © {new Date().getFullYear()} Marshal Ram
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          height: "100vh",
          px: { xs: 1, sm: 2, md: 3 },
        }}
        ref={mainRef}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          pl={{ xs: 1, md: 2 }}
          sx={{ color: colorTokens.text.primary }}>
          {query}{" "}
          <span style={{ color: colorTokens.brand.primary }}>videos</span>
        </Typography>

        {/* Loading State — Show skeleton cards */}
        {isLoading && (
          <Grid
            container
            spacing={2}
            sx={{ px: { xs: 1, md: 2 } }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Error State — Show retry UI */}
        {error && !isLoading && (
          <ErrorState
            message="Failed to load videos. Please check your connection and try again."
            onRetry={() => {
              // Clear cache and refetch
              setTimeout(() => {
                fetchNextPage();
              }, 0);
            }}
          />
        )}

        {/* Content State — Show videos or empty message */}
        {!isLoading && !error && allVideos.length > 0 && (
          <Videos videos={allVideos} />
        )}

        {!isLoading && !error && allVideos.length === 0 && (
          <Typography sx={{ color: colorTokens.text.secondary, pl: 2 }}>
            No videos found for "{query}"
          </Typography>
        )}

        {/* Loading More Indicator */}
        <div ref={loadMoreRef} style={{ height: "1.5px" }}>
          {isFetchingNextPage && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: colorTokens.text.secondary }}>
                Loading more videos...
              </Typography>
            </Box>
          )}
        </div>
      </Box>
    </Stack>
  );
};

export default Feed;
