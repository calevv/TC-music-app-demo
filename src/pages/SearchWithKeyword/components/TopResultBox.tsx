import { Box, styled, Typography } from "@mui/material";
import { TrackObject } from "../../../models/playlist";
import PlayButton from "../../../common/components/PlayButton";
interface TopResultBoxProps {
  track: TrackObject | null;
}
const TopResultBox = (topResult: TopResultBoxProps) => {
  console.log("topResult", topResult.track);
  const track = topResult?.track;

  const ResultBox = styled(Box)(({ theme }) => ({
    boxSizing: "border-box",
    borderRadius: "5px",
    marginTop: "20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
    minHeight: "280px",
    position: "relative",
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
    position: "absolute",
    bottom: "20px",
    right: "20px",
    opacity: 0,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  });
  return (
    <ResultBox>
      <img
        width="92px"
        src={track?.album?.images[0].url}
        alt={track?.name}
        style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
      />
      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        {track?.name}
      </Typography>
      <Typography>
        song by {track?.artists?.map((artist) => artist.name).join(" ")}
      </Typography>
      <Overlay className="overlay">
        <PlayButton />
      </Overlay>
    </ResultBox>
  );
};

export default TopResultBox;
