import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import SearchInput from "./SearchInput";

const SearchPageBar = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams<{ keyword: string }>(); // URL에서 keyword를 가져옵니다.
  const [keyword, setKeyword] = useState<string>(urlKeyword || ""); // 초기 상태로 URL의 keyword를 사용합니다.

  useEffect(() => {
    if (urlKeyword) {
      setKeyword(urlKeyword);
    }
  }, [urlKeyword]);

  useEffect(() => {
    if (keyword) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/search`);
    }
  }, [keyword, navigate]);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event?.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <SearchInput value={keyword} onChange={handleSearchKeyword} />
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
            msOverflowStyle: "none", // IE and Edge
            scrollbarWidth: "none", // Firefox
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SearchPageBar;
