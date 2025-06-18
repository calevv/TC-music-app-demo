import React, { useEffect } from "react";
import { TrackObject } from "../../../models/playlist"; // TrackObject 타입이 Spotify API의 Track Object와 일치하는지 확인해주세요.
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { usePlaylistStore } from "../../../stores/usePlaylistStore";
import useAddPlaylistItem from "../../../hooks/useAddPlaylistItem"; // useAddPlaylistItem 훅의 isLoading 상태를 가져와야 합니다.

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));
const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});

interface SearchResultListProps {
  list: TrackObject[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const uniqueTracks = Array.from(
    new Map(list.map((track) => [track.id, track])).values()
  );
  const playlistId = usePlaylistStore((state) => state.playlistId);
  console.log("playlistId", playlistId);
  // useAddPlaylistItem 훅에서 isLoading 상태도 구조 분해 할당으로 가져옵니다.
  const { mutate: addTrack } = useAddPlaylistItem();

  // `handleAddClick` 함수를 개별 트랙에 대한 인자를 받도록 수정합니다.
  const handleAddClick = (trackUri: string) => {
    addTrack({ uris: [trackUri] });
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {uniqueTracks.map((track) => (
            <StyledTableRow key={track.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    {track.album?.images && track.album.images.length > 0 ? (
                      <AlbumImage
                        src={track.album.images[0].url}
                        width="40px"
                        alt={`${track.name} album cover`}
                      />
                    ) : (
                      // 앨범 이미지가 없을 경우 대체 이미지 또는 아이콘 표시
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "grey.800",
                          borderRadius: "4px",
                          marginRight: "12px",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          No Image
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box>
                    <Typography fontWeight={700}>{track.name}</Typography>
                    <Typography color="text.secondary">
                      {track.artists && track.artists.length > 0
                        ? track.artists[0].name
                        : "Unknown Artist"}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "block" } }}>
                {track.album?.name}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    if (track.uri) {
                      // track.uri가 존재하는지 확인
                      handleAddClick(track.uri);
                    } else {
                      console.warn(
                        "Track URI is undefined, cannot add to playlist:",
                        track
                      );
                      // 사용자에게 메시지를 표시하거나 버튼을 비활성화하는 등의 추가 처리
                    }
                  }}
                >
                  ADD
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
          {hasNextPage && (
            <TableRow>
              <TableCell colSpan={3}>
                {" "}
                {/* colspan을 적절히 조정 */}
                <div ref={ref} style={{ height: 1 }} />
                {isFetchingNextPage && <LoadingSpinner />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResultList;
