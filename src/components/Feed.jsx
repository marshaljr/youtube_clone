import { Box, Stack, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchVideos } from "../utils/fetchFromAPI";
import { Videos, Sidebar, Loader } from "./";
import { useDebounce } from "../hooks/Debounce";
import { useRef, useState, useEffect } from "react";

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

  if (isLoading) return <Loader />;
  if (error) return <Typography color="red">Error: {error.message}</Typography>;

  return (
    <Stack
      sx={{
        flexDirection: { sx: "column", md: "row" },
        backgroundColor: "#000",
        minHeight: "100vh",
      }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          width: { md: "12rem", xs: "100%" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
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
          variant="body2"
          sx={{ color: "gray", textAlign: "center", mt: 2, mb: 6 }}>
          © {new Date().getFullYear()} Marshal Ram
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          height: "100vh",
          px: 2,
        }}
        ref={mainRef}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          pl={2}
          sx={{ color: "white" }}>
          {query} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
        {allVideos.length > 0 ? (
          <Videos videos={allVideos} />
        ) : (
          <Typography color="gray" pl={2}>
            No videos found!
          </Typography>
        )}
        <div ref={loadMoreRef} style={{ height: "1.5px" }}>
          {isFetchingNextPage && <Loader />}
        </div>
      </Box>
    </Stack>
  );
};

export default Feed;
