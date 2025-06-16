import { Grid } from "@mui/material";
import { SimplifiedAlbum } from "../../../models/album";
import { ApiResponse } from "../../../models/apiResponse";
import Card from "../../../common/components/Card";

interface ResultBoxProps {
  albums: ApiResponse<SimplifiedAlbum> | undefined;
}

const AlbumBox = (albums: ResultBoxProps) => {
  const album = albums?.albums;
  return (
    <Grid container spacing={2}>
      {album?.items.slice(0, 6).map((item) => {
        const imageUrl = item.images?.[0]?.url || "";
        return (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
            <Card
              name={item.name}
              image={imageUrl}
              artistName={item.artists.map((artist) => artist.name).join(", ")}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default AlbumBox;
