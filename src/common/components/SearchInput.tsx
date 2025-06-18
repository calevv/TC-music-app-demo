import {
  Box,
  InputAdornment,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchInputProps extends Omit<TextFieldProps, "value" | "onChange"> {
  value: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = styled((props: SearchInputProps) => {
  const { setKeyword, value, ...rest } = props;

  // 클리어 버튼 클릭 핸들러
  const handleClearClick = () => {
    setKeyword("");
  };

  return (
    <TextField
      {...rest}
      value={value}
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
          endAdornment: value ? (
            <InputAdornment position="end">
              <ClearIcon
                style={{ color: "white", cursor: "pointer" }}
                onClick={handleClearClick}
              />
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
})(({ theme }) => ({
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
