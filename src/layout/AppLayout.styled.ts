import { Box, styled } from "@mui/material";
import { NavLink } from "react-router";

export const Layout = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  padding: "10px",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "0px",
  },
}));

export const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
export const ContentBox = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "20px",
  [theme.breakpoints.down("sm")]: {
    flex: 1,
  },
}));

export const BottomNav = styled(Box)(({ theme }) => ({
  alignItems: "flex-end",
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  padding: "10px 0",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  "&.active": {
    color: theme.palette.text.primary, // 활성화된 링크의 색상 설정
  },
  "&:hover": {
    color: theme.palette.text.primary, // 마우스 오버 시 색상 변경
  },
}));
export const BottomNavItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
