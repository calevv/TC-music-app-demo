import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../../common/components/LoadingSpinner";

const NewRelease = lazy(() => import("./components/NewRelease"));
const SearchItems = lazy(() => import("./components/SearchItems"));

function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
              width: 0,
              msOverflowStyle: "none", // IE and Edge
              scrollbarWidth: "none", // Firefox
            },
          }}
        >
          <NewRelease />
          <SearchItems />
        </Box>
      </Box>
    </Suspense>
  );
}

export default Home;
