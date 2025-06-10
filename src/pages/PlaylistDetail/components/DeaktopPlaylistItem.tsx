import { styled, TableCell, TableRow } from "@mui/material";
import {
  EpisodeObject,
  PlaylistTrack,
  TrackObject,
} from "../../../models/playlist";
import moment from "moment";

interface DeaktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));
const DeaktopPlaylistItem = ({ item, index }: DeaktopPlaylistItemProps) => {
  const isTrack = (t: TrackObject | EpisodeObject): t is TrackObject =>
    t.type === "track";
  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track?.name || "no name"}</TableCell>
      <TableCell>
        {item.track
          ? isTrack(item.track)
            ? item.track?.album?.name
            : "Unknown"
          : "N/A"}
      </TableCell>
      <TableCell>
        {item.added_at ? moment(item.added_at).format("YYYY-MM-DD") : "Unknown"}
      </TableCell>
      <TableCell>
        {item.track
          ? isTrack(item.track)
            ? moment(item.track?.duration_ms).format("mm:ss")
            : "Unknown"
          : "N/A"}{" "}
      </TableCell>
    </StyledTableRow>
  );
};

export default DeaktopPlaylistItem;
