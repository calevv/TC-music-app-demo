import React from "react";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useLocation } from "react-router-dom";

const ReturnButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const isSearchPage = location.pathname === "/search";
  if (isMainPage || isSearchPage) {
    return null;
  }
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };
  return (
    <Button
      sx={{ display: { xs: "block", sm: "none" } }} // 이 부분은 이전과 동일하게 화면 크기에 따라 제어됩니다.
      onClick={handleGoBack}
    >
      <KeyboardBackspaceIcon />
    </Button>
  );
};

export default ReturnButton;
