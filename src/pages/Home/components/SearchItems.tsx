import React, { useState, useEffect } from "react"; // useState, useEffect 추가
import { SEARCH_TYPE } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../../common/components/LoadingSpinner"; // 사용하지 않지만 기존에 있었으므로 남겨둠
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Grid, Skeleton, Typography } from "@mui/material";
import Card from "../../../common/components/Card";
import { SimplifiedAlbum } from "../../../models/album";
import { TrackObject } from "../../../models/playlist";

const SearchItems = () => {
  const types = [SEARCH_TYPE.Track, SEARCH_TYPE.Album];
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const yearRange = `${lastYear}-${currentYear}`;

  const { data, isLoading, error } = useSearchItemsByKeyword({
    q: `year:${yearRange}`,
    type: types,
    limit: 6,
  });

  const [showSkeleton, setShowSkeleton] = useState(true);
  const MIN_LOADING_TIME = 1000; // 최소 로딩 시간 (밀리초 단위, 1초)

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
          Recent albums
        </Typography>
        <Grid container spacing={2}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
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

        <Typography variant="h1" my="20px">
          Recent Tracks
        </Typography>
        <Grid container spacing={2}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
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

  if (
    !data?.pages?.[0]?.albums?.items?.length &&
    !data?.pages?.[0]?.tracks?.items?.length
  ) {
    return <Typography variant="h2">데이터를 찾을 수 없습니다.</Typography>;
  }

  const result = data?.pages[0];

  return (
    <div>
      <Typography variant="h1" my="20px">
        Recent albums
      </Typography>
      <Grid container spacing={2}>
        {result?.albums?.items.map((item: SimplifiedAlbum) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
            <Card
              name={item.name}
              image={item.images[0].url}
              artistName={item.artists.map((artist) => artist.name).join(", ")}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h1" paddingTop="10px">
        Recent Tracks
      </Typography>
      <Grid container spacing={2}>
        {result?.tracks?.items.map((item: TrackObject) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={item.id}>
            <Card
              name={item.name}
              image={item.album?.images[0].url}
              artistName={item.artists?.map((artist) => artist.name).join(", ")}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchItems;
