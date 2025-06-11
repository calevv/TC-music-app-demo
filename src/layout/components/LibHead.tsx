import { Box, Button, styled, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import { getSpotifyAuthUrl } from "../../utils/auth";
import useGetCurrentUsersProfile from "../../hooks/useGetCurrentUsersProfile";

const Head = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
});

export const LibHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentUsersProfile();
  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: "music list" });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <Head>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon />
      </Button>
    </Head>
  );
};
function useGetCurrentUserProfile(): { data: any } {
  throw new Error("Function not implemented.");
}
