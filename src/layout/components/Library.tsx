import React, { useEffect } from "react";
import { EmptyPlaylist } from "./EmptyPlaylist";
import useGetCurrentUserPlaylist from "../../hooks/useGetCurrentUserPlaylist";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import { Box, styled } from "@mui/material";
import useGetCurrentUsersProfile from "../../hooks/useGetCurrentUsersProfile";
import { useInView } from "react-intersection-observer";
import PlayList from "./PlayList";
import { useAuthStore } from "../../stores/useAuthStore";
import { HashLoader } from "react-spinners";

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 170px)",
  },
}));

const Library = () => {
  const { ref, inView } = useInView();
  const { isAuthenticated } = useAuthStore();

  const {
    data: playlistData,
    isLoading: isPlaylistLoading,
    error: playlistError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCurrentUserPlaylist({
    limit: 10,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPlaylistLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <EmptyPlaylist />;
  }

  if (playlistError) {
    // 여기서 발생하는 에러는 로그인 후 플레이리스트를 가져오다가 발생한 에러
    console.log(playlistError.message);
    return <EmptyPlaylist />;
  }

  // const hasPlaylists =
  //   playlistData &&
  //   playlistData.pages &&
  //   playlistData.pages.some((page) => page.items.length > 0);

  // if (!isAuthenticated || !user || !hasPlaylists) {
  //   return <EmptyPlaylist />;
  // }

  return (
    <PlaylistContainer>
      {playlistData?.pages.map((page, index) => (
        <PlayList playlists={page.items} key={index} />
      ))}
      <div ref={ref}>
        {isFetchingNextPage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "20px auto",
            }}
          >
            <HashLoader color="#1ed760" size={30} speedMultiplier={1} />
          </Box>
        )}
      </div>
    </PlaylistContainer>
  );
};

export default Library;
