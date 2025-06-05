import { Alert } from "@mui/material";
import React from "react";

interface ErrorMessagerops {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessagerops) => {
  return <Alert severity="error">{errorMessage}</Alert>;
};
export default ErrorMessage;
