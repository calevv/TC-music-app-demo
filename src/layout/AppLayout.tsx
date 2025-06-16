import { Suspense } from "react";
import { Outlet } from "react-router";
import * as S from "./AppLayout.styled";
import NavBox from "./components/NavBox";
import { LibHead } from "./components/LibHead";
import NavBar from "./components/NavBar";
import LoadingSpinner from "../common/components/LoadingSpinner";
import Library from "./components/Library";

function AppLayout() {
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
      </S.Layout>
    </Suspense>
  );
}

export default AppLayout;
