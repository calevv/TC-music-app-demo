import { List, styled } from "@mui/material";
import { ApiResponse } from "../../../models/apiResponse";
import { TrackObject } from "../../../models/playlist";
import SongItem from "./SongItem";

interface ResultBoxProps {
  tracks: ApiResponse<TrackObject> | undefined;
  setOpen: (value: boolean) => void;
  setMessage: (message: string) => void;
}

const SongBox = styled(List)(({ theme }) => ({
  boxSizing: "border-box",
  marginTop: "20px",
  padding: "10px",
}));

const SongListBox = ({ tracks, setOpen, setMessage }: ResultBoxProps) => {
  return (
    <SongBox>
      {tracks?.items.slice(0, 4).map((item) => {
        return (
          <SongItem
            key={item.id}
            track={item}
            setOpen={setOpen}
            setMessage={setMessage}
          />
        );
      })}
    </SongBox>
  );
};
export default SongListBox;
