import {
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TrackObject } from "../../../models/playlist";
import useGetCurrentUserPlaylist from "../../../hooks/useGetCurrentUserPlaylist";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import useAddPlaylistItem from "../../../hooks/useAddPlaylistItem";
import { usePlaylistStore } from "../../../stores/usePlaylistStore";

const SongList = styled(ListItem)(({ theme }) => ({
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const Overlay = styled(Box)({
  width: "20%",
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const PlaylistMenu = styled(Menu)(({ theme }) => ({
  maxHeight: "300px",
  // overflowY: "hidden",

  "& .MuiPaper-root": {
    backgroundColor: theme.palette.action.active,
    color: "white",
    maxWidth: "160px",
    width: "100%",
    scrollbarWidth: "none", // root 안에 있어야 적용이 됨
    "&::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",
  },
}));
interface SongItemProps {
  track: TrackObject;
  setOpen: (value: boolean) => void;
  setMessage: (message: string) => void;
}

const SongItem = ({ track, setOpen, setMessage }: SongItemProps) => {
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

  const { mutate: addToPlaylist, error: addError } = useAddPlaylistItem();
  const { setPlaylistId } = usePlaylistStore();
  console.log("playlistData", playlistData);
  const { isAuthenticated } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) {
      setMessage("로그인을 해주세요");
      setOpen(true);
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const addSongToList = (playlistId: string) => {
    if (track.uri) {
      setPlaylistId(playlistId);
      addToPlaylist(
        {
          uris: [track.uri],
        },
        {
          onSuccess: () => {
            setMessage("Added to playlist");
            setOpen(true);
            handleMenuClose();
          },
          onError: () => {
            setMessage("Failed to add to playlist");
            setOpen(true);
            handleMenuClose();
          },
        }
      );
    } else {
      setMessage("Song URI is not available.");
      setOpen(true);
    }
  };
  return (
    <SongList>
      <ListItemIcon>
        <img
          src={track.album?.images[0].url}
          alt={track.name}
          style={{
            width: 40,
            height: 40,
            borderRadius: "4px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        />
      </ListItemIcon>
      <ListItemText
        primary={track.name}
        secondary={track.artists?.map((artist) => artist.name).join(", ")}
      />
      <Overlay className="overlay">
        <IconButton onClick={handleMenuOpen}>
          <AddCircleOutlineIcon sx={{ color: "white" }} />
        </IconButton>
        <PlaylistMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {playlistData?.pages.flatMap((page, pageIndex) =>
            page.items.map((item) => (
              <MenuItem
                sx={{
                  display: "block",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: "#444",
                  },
                }}
                key={`${pageIndex}-${item.id}`}
                onClick={() => {
                  if (item.id) {
                    addSongToList(item.id);
                  } else {
                    setMessage("Playlist ID is not available.");
                    setOpen(true);
                  }
                }}
              >
                {item.name}
              </MenuItem>
            ))
          )}{" "}
          <div ref={ref} style={{ height: 1 }} />
          {isFetchingNextPage && <LoadingSpinner />}
        </PlaylistMenu>
      </Overlay>
      <Typography>{moment(track.duration_ms).format("mm:ss")}</Typography>
    </SongList>
  );
};

export default SongItem;
