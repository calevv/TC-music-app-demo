import { Grid, Skeleton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react"; // useEffect와 useState 추가
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

const NewRelease = () => {
  const { data, isLoading, error } = useGetNewReleases();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const MIN_LOADING_TIME = 1000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      setShowSkeleton(true);
    } else {
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, MIN_LOADING_TIME);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading || showSkeleton) {
    return (
      <div>
        <Typography variant="h1" my="20px">
          New Released Albums
        </Typography>
        <Grid container spacing={2}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
              {" "}
              {/* Grid 자식에는 'item' prop 사용 */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "100%",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <Skeleton width="80%" style={{ marginTop: 8 }} />
              <Skeleton width="60%" />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" my="20px">
        New Released Albums
      </Typography>
      <Grid container spacing={2}>
        {data?.albums.items.map((album) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
            <Card
              name={album.name}
              image={album.images[0].url}
              artistName={album.artists.map((artist) => artist.name).join(", ")}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewRelease;
