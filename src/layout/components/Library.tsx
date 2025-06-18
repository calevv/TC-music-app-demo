import React, { useEffect } from "react";
import { EmptyPlaylist } from "./EmptyPlaylist";
import useGetCurrentUserPlaylist from "../../hooks/useGetCurrentUserPlaylist";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import { styled } from "@mui/material";
import useGetCurrentUsersProfile from "../../hooks/useGetCurrentUsersProfile";
import { useInView } from "react-intersection-observer";
import PlayList from "./PlayList";
import { useAuthStore } from "../../stores/useAuthStore";

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
  const { data: user, isLoading: isUserLoading } = useGetCurrentUsersProfile();

  const {
    data: playlistData,
    isLoading: isPlaylistLoading,
    error: playlistError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCurrentUserPlaylist({
    limit: 10,
    offset: 0,
    enabled: !!user,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isUserLoading || isPlaylistLoading) {
    return <LoadingSpinner />;
  }

  if (playlistError) {
    // 여기서 발생하는 에러는 로그인 후 플레이리스트를 가져오다가 발생한 에러
    // return <ErrorMessage errorMessage={playlistError.message} />;
    return <EmptyPlaylist />;
  }

  const hasPlaylists =
    playlistData &&
    playlistData.pages &&
    playlistData.pages.some((page) => page.items.length > 0);

  if (!isAuthenticated || !user || !hasPlaylists) {
    return <EmptyPlaylist />;
  }

  return (
    <PlaylistContainer>
      {playlistData?.pages.map((page, index) => (
        <PlayList playlists={page.items} key={index} />
      ))}
      <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
    </PlaylistContainer>
  );
};

export default Library;
