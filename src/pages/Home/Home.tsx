import { Box } from "@mui/material";
import NewRelease from "./components/NewRelease";
import SearchItems from "./components/SearchItems";

function Home() {
  return (
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
  );
}

export default Home;
