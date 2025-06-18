import { Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

const NewRelease = () => {
  const { data, isLoading, error } = useGetNewReleases();
  console.log("data", data);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Typography variant="h1" my="20px">
  //         New Released Albums
  //       </Typography>
  //       <Grid container spacing={2}>
  //         {Array.from(new Array(6)).map((_, index) => (
  //           <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
  //             <div
  //               style={{
  //                 position: "relative",
  //                 width: "100%",
  //                 paddingTop: "100%",
  //               }}
  //             >
  //               <Skeleton
  //                 variant="rectangular"
  //                 sx={{
  //                   position: "absolute",
  //                   top: 0,
  //                   left: 0,
  //                   width: "100%",
  //                   height: "100%",
  //                 }}
  //               />
  //             </div>
  //             <Skeleton width="80%" style={{ marginTop: 8 }} />
  //             <Skeleton width="60%" />
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </div>
  //   );
  // }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" paddingTop="10px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data?.albums.items.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card
                name={album.name}
                image={album.images[0].url}
                artistName={album.artists
                  .map((artist) => artist.name)
                  .join(", ")}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default NewRelease;
