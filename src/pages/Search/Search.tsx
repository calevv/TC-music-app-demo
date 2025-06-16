import React from "react";
import useGetSeveralBrowseCategories from "../../hooks/useGetSeveralBrowseCategories";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import { Box, Grid, styled, Typography } from "@mui/material";

const Search = () => {
  const { data, isLoading } = useGetSeveralBrowseCategories();
  const categories = data?.categories;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log("datadata", data);
  const SearchContainer = styled(Box)(({ theme }) => ({
    padding: "40px 20px",
    boxSizing: "border-box",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  }));
  const ImgBox = styled("div")({
    display: "block",
    width: "50%",
    aspectRatio: 1,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "5px",
    position: "absolute",
    bottom: "-30px",
    right: "-20px",
    transform: "rotate(30deg)",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  });

  const colors = [
    // 보라색 계열 (원본 포함)
    "#792DDE", // 원본: hsl(273°, 66%, 52%)
    "#8E44AD", // 어두운 보라: hsl(280°, 48%, 47%) - 약간 어둡지만 비슷한 톤
    "#9B59B6", // 중간 보라: hsl(287°, 45%, 53%)
    "#A74BC1", // 밝은 보라: hsl(290°, 56%, 56%)

    // 파란색 계열
    "#2980B9", // 진한 파랑: hsl(203°, 64%, 44%) - 약간 어둡지만 생생함
    "#3498DB", // 밝은 파랑: hsl(207°, 70%, 53%)
    "#007ACC", // 마이크로소프트 파랑: hsl(206°, 100%, 40%)
    "#008CBA", // 약간 녹색 도는 파랑: hsl(198°, 100%, 36%)

    // 녹색 계열
    "#27AE60", // 에메랄드 그린: hsl(148°, 65%, 42%)
    "#2ECC71", // 밝은 에메랄드: hsl(149°, 70%, 50%)
    "#1ABC9C", // 청록색: hsl(163°, 72%, 48%)

    // 노란색/주황색 계열
    "#F1C40F", // 햇살 노랑: hsl(48°, 97%, 50%)
    "#F39C12", // 당근 주황: hsl(35°, 90%, 51%)
    "#E67E22", // 호박 주황: hsl(29°, 79%, 52%)

    // 빨간색/분홍색 계열
    "#E74C3C", // 토마토 빨강: hsl(6°, 79%, 57%)
    "#C0392B", // 벽돌 빨강: hsl(7°, 67%, 46%)
    "#FF6B81", // 밝은 핑크: hsl(350°, 100%, 78%) - 좀 더 밝게
    "#FF4757", // 라즈베리 빨강: hsl(355°, 100%, 64%)

    // 갈색/회색 계열 (중성적인 밝기)
    "#7F8C8D", // 어두운 회색: hsl(180°, 7%, 52%)
    "#95A5A6", // 중간 회색: hsl(180°, 8%, 62%)
  ];

  return (
    <SearchContainer>
      {categories && categories.items.length > 0 ? (
        <Grid container spacing={2}>
          {categories.items.map((item) => {
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];

            const imageUrl = item.icons[0].url;
            return (
              <Grid
                style={{
                  backgroundColor: randomColor,
                  padding: "10px",
                  borderRadius: "10px",
                  aspectRatio: "5/3",
                  position: "relative",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={item.id}
              >
                <Typography variant="h6">{item.name}</Typography>
                {imageUrl ? (
                  <ImgBox style={{ backgroundImage: `url(${imageUrl})` }} /> // 올바른 배경 이미지 적용 방식
                ) : (
                  // 이미지가 없을 경우 대체 UI를 표시할 수 있습니다.
                  <ImgBox style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <Typography variant="caption" sx={{ color: "white" }}>
                      No Image
                    </Typography>
                  </ImgBox>
                )}
              </Grid>
            );
          })}
        </Grid>
      ) : (
        "no data"
      )}
    </SearchContainer>
  );
};

export default Search;
