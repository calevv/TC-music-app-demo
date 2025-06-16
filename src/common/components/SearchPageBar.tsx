import { Box, InputAdornment, styled, TextField } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import SearchIcon from "@mui/icons-material/Search";

const SearchPageBar = () => {
  const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "80%",
    margin: "20px auto",
    display: "flex",
    justifyContent: "center",
    "& .MuiInputBase-root": {
      borderRadius: "4px",
      backgroundColor: theme.palette.action.active,
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "gray",
      },
      "&.Mui-focused fieldset": {
        borderColor: "gray",
      },
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <StyledTextField
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
      />
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SearchPageBar;
