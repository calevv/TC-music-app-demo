import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('content') as HTMLElement);
root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* mui 브라우저 별 기본 스타일 재설정 */}
            <App />
        </ThemeProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// 웹 성능 측정 함수
reportWebVitals();
