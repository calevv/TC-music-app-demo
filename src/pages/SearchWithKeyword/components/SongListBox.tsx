import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { ApiResponse } from "../../../models/apiResponse";
import { TrackObject } from "../../../models/playlist";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
interface ResultBoxProps {
  tracks: ApiResponse<TrackObject> | undefined;
}
const SongBox = styled(List)(({ theme }) => ({
  boxSizing: "border-box",
  marginTop: "20px",
}));
const SongList = styled(ListItem)(({ theme }) => ({
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const Overlay = styled("div")({
  width: "10%",
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});
const SongListBox = (tracks: ResultBoxProps) => {
  console.log("tracks", tracks);
  const track = tracks?.tracks;
  return (
    <SongBox>
      {track?.items.slice(0, 4).map((item) => {
        return (
          <SongList>
            <ListItemIcon>
              <img
                src={item.album?.images[0].url}
                alt={item.name}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "4px",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={item.name} // 주요 텍스트 (예: 노래 제목)
              secondary={item?.artists?.map((artist) => artist.name).join(" ")}
            />
            <Overlay className="overlay">
              <AddCircleOutlineIcon />
            </Overlay>
            <Typography>{moment(item?.duration_ms).format("mm:ss")}</Typography>
          </SongList>
        );
      })}
    </SongBox>
  );
};
export default SongListBox;
