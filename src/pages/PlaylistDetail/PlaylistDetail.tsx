import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DefaultImage from "../../common/components/DefaultImage";
import useGetPlaylistItem from "../../hooks/useGetPlaylistItem";
import DeaktopPlaylistItem from "./components/DeaktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { useAuthStore } from "../../stores/useAuthStore";
import LoginButton from "../../common/components/LoginButton";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import { usePlaylistStore } from "../../stores/usePlaylistStore";
import { EpisodeObject, TrackObject } from "../../models/playlist";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));
const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // ✨ Zustnad 스토어에서 setPlaylistId 액션을 가져옵니다.
  const setPlaylistId = usePlaylistStore((state) => state.setPlaylistId);

  // id가 유효하지 않거나 인증되지 않은 경우
  const isInvalid = !isAuthenticated || !id;

  // ✨ id가 변경될 때마다 Zustnad 스토어에 저장합니다.
  useEffect(() => {
    // id가 유효할 때만 저장
    if (id) {
      setPlaylistId(id);
    } else {
      // id가 없을 경우, 스토어의 playlistId를 초기화할 수도 있습니다.
      setPlaylistId(null);
    }
  }, [id, setPlaylistId]); // id와 setPlaylistId가 변경될 때마다 이 훅을 실행합니다.

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
  } = useGetPlaylist({ playlist_id: id ?? "" });
  const {
    data: playlistDetail,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isPlaylistItemLoading,
    isError: isPlaylistItemError,
  } = useGetPlaylistItem({
    playlist_id: id ?? "",
    limit: PAGE_LIMIT,
  });

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isInvalid) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        flexDirection="column"
      >
        <Typography variant="h2" fontWeight={700} mb="20px">
          다시 로그인 하세요
        </Typography>
        <LoginButton />
      </Box>
    );
  }
  // 플레이리스트 정보 로딩 중
  if (isPlaylistLoading) {
    return <LoadingSpinner />;
  }

  // 플레이리스트 정보 , 아이템 로딩 에러
  if (isPlaylistError || isPlaylistItemError) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        flexDirection="column"
      >
        <Typography variant="h5" color="error" mb="20px">
          다시 로그인 하세요
        </Typography>
        <LoginButton />
      </Box>
    );
  }
  return (
    <StyledTableContainer>
      <PlaylistHeader container spacing={7}>
        <ImageGrid size={{ sm: 12, md: 2 }}>
          {playlist?.images ? (
            <AlbumImage
              src={playlist?.images[0].url}
              alt="playlist_cover.jpg"
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid size={{ sm: 12, md: 10 }}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
                alt="앨범 커버"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist?.owner?.display_name
                  ? playlist?.owner.display_name
                  : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                &nbsp;• {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
      {playlist?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch />
      ) : (
        <>
          <Table sx={{ display: { xs: "none", sm: "table" } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "10%" }}>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistDetail?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => {
                  return (
                    <DeaktopPlaylistItem
                      item={item}
                      key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  );
                })
              )}
              <TableRow sx={{ height: "5px" }} ref={ref} />
              {isFetchingNextPage && <LoadingSpinner />}
            </TableBody>
          </Table>
          <List sx={{ width: "100%", display: { xs: "block", sm: "none" } }}>
            {playlistDetail?.pages.map((page, pageIndex) =>
              page.items.map((item, itemIndex) => {
                const globalIndex = pageIndex * PAGE_LIMIT + itemIndex + 1;
                const isTrack = (
                  t: TrackObject | EpisodeObject
                ): t is TrackObject => t.type === "track";
                return (
                  <ListItem key={item?.track?.id || globalIndex}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={
                          item.track
                            ? isTrack(item.track)
                              ? item.track?.album?.images[0].url
                              : ""
                            : ""
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item?.track?.name}
                      secondary={
                        item.track
                          ? isTrack(item.track)
                            ? item.track?.album?.artists
                                .map((artist) => artist.name)
                                .join(", ")
                            : "unknown"
                          : "N/A"
                      }
                    />
                  </ListItem>
                );
              })
            )}
            <Box sx={{ height: "5px" }} ref={ref} />
            {isFetchingNextPage && <LoadingSpinner />}
          </List>
        </>
      )}
    </StyledTableContainer>
  );
};

export default PlaylistDetail;
