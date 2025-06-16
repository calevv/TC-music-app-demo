import {
  Box,
  InputAdornment,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps extends Omit<TextFieldProps, "value" | "onChange"> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = styled((props: SearchInputProps) => (
  <TextField
    {...props}
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
))(({ theme }) => ({
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
export default SearchInput;
