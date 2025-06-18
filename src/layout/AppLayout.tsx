import { Suspense } from "react";
import { Outlet } from "react-router";
import * as S from "./AppLayout.styled";
import NavBox from "./components/NavBox";
import { LibHead } from "./components/LibHead";
import NavBar from "./components/NavBar";
import LoadingSpinner from "../common/components/LoadingSpinner";
import Library from "./components/Library";
import { Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const AppLayout = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <S.Layout>
        <S.Sidebar>
          <S.ContentBox>
            <NavBox />
          </S.ContentBox>
          <S.ContentBox sx={{ height: "100%" }}>
            <LibHead />
            <Library />
          </S.ContentBox>
        </S.Sidebar>
        <S.ContentBox
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <NavBar />
          <Outlet />
        </S.ContentBox>
        {/* 모바일 버전에서 바닥에 Navbar */}
        <S.BottomNav>
          <S.StyledNavLink to="/">
            <S.BottomNavItem>
              <HomeIcon />
              <Typography variant="subtitle1">Home</Typography>
            </S.BottomNavItem>
          </S.StyledNavLink>
          <S.StyledNavLink to="/search">
            <S.BottomNavItem>
              <SearchIcon />
              <Typography variant="subtitle1">Search</Typography>
            </S.BottomNavItem>
          </S.StyledNavLink>
          <S.StyledNavLink to="/playlist">
            <S.BottomNavItem>
              <BookmarkIcon />
              <Typography variant="subtitle1">Playlist</Typography>
            </S.BottomNavItem>
          </S.StyledNavLink>
        </S.BottomNav>
      </S.Layout>
    </Suspense>
  );
};

export default AppLayout;
