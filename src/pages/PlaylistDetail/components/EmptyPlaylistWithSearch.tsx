import {
  Alert,
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";
import { HashLoader } from "react-spinners";
const SearchContainer = styled(Box)({
  // 스크롤 디자인
  padding: "16px",
  width: "100%",
  height: "100%",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
});
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "4px", // 입력 필드의 둥근 모서리
    backgroundColor: theme.palette.action.active, // 입력 필드의 배경 색상
    color: "white", // 텍스트 색상
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // 테두리 색상 제거
    },
    "&:hover fieldset": {
      borderColor: "gray", // 마우스 호버 시 테두리 색상
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray", // 포커스 시 테두리 색상
    },
  },
}));
const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });
  console.log("dd", data);
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const tracks = data?.pages.flatMap((page) => page.tracks?.items || []) ?? [];
  const hasResults = tracks.length > 0;

  return (
    <SearchContainer>
      <Typography variant="h1" mx="20px" my="10px">
        Let's find something for your playlist
      </Typography>
      <StyledTextField
        value={keyword}
        autoComplete="off"
        variant="outlined"
        placeholder="Search for songs or episodes"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          },
        }}
        onChange={handleSearchKeyword}
      />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "20px auto",
          }}
        >
          <HashLoader color="#1ed760" size={30} speedMultiplier={1} />
        </Box>
      ) : hasResults ? (
        <SearchResultList
          list={tracks}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      ) : keyword === "" ? (
        <></> // 검색어가 없을 때는 아무것도 표시하지 않음
      ) : (
        <Box my="30px">
          <Alert severity="warning">{`No Result for "${keyword}"`}</Alert>
        </Box>
      )}
    </SearchContainer>
  );
};
export default EmptyPlaylistWithSearch;
