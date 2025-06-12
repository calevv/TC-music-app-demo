import { Button, Card, styled, Typography } from "@mui/material";
import React from "react";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUsersProfile from "../../hooks/useGetCurrentUsersProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,

  padding: "20px",
  borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

export const EmptyPlaylist = () => {
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
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <CreatePlaylistButton
        variant="contained"
        color="secondary"
        onClick={handleCreatePlaylist}
      >
        Create playlist
      </CreatePlaylistButton>
    </EmptyPlaylistCard>
  );
};
