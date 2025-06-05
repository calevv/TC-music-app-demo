import "./App.css";

import { RouterProvider } from "react-router";
import { router } from "./router/router";
import useExchageToken from "./hooks/useExchageToken";
import { useEffect } from "react";
// 0. 사이드바 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 서치페이지 /search
// 3. 서치결과 페이지 /search/:keyword
// 4. 플레이리스트 디테일 페이지 /playlist/:id
// 5. (모바일) 플레이리스트 보여주는 페이지 /playlist
//  //

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  let codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchageToken } = useExchageToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchageToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchageToken]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
