import { Grid } from "@mui/material";
import { ApiResponse } from "../../../models/apiResponse";
import { ArtistObject } from "../../../models/artist";
import ArtistCard from "../../../common/components/ArtistCard";

interface ResultBoxProps {
  artists: ApiResponse<ArtistObject> | undefined;
}

const ArtistBox = (artists: ResultBoxProps) => {
  const artist = artists?.artists;
  return (
    <Grid container spacing={2}>
      {artist?.items.slice(0, 6).map((item) => {
        const imageUrl = item.images?.[0]?.url || "";
        return (
          <Grid spacing={5} size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
            <ArtistCard
              name={item.name}
              image={imageUrl}
              artistName={item.type}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default ArtistBox;
