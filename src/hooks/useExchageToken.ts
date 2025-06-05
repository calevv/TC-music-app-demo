import { useMutation } from "@tanstack/react-query";
import { exchageToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";

const useExchageToken = () => {
  return useMutation<
    ExchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchageToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

export default useExchageToken;
