import React from 'react';
import { createBrowserRouter } from 'react-router';

const AppLayout = React.lazy(() => import('./../layout/AppLayout'));
const Home = React.lazy(() => import('../pages/Home/Home'));
const Search = React.lazy(() => import('../pages/Search/Search'));
const SearchWithKeyword = React.lazy(() => import('../pages/SearchWithKeyword/SearchWithKeyword'));
const Playlist = React.lazy(() => import('../pages/Playlist/Playlist'));
const PlaylistDetail = React.lazy(() => import('../pages/PlaylistDetail/PlaylistDetail'));
const Not = React.lazy(() => import('../pages/Not/Not'));

// 0. 사이드바 (플레이리스트, 메뉴)
// 1. 홈페이지 /
// 2. 서치페이지 /search
// 3. 서치결과 페이지 /search/:keyword
// 4. 플레이리스트 디테일 페이지 /playlist/:id
// 5. (모바일) 플레이리스트 보여주는 페이지 /playlist

export const router = createBrowserRouter([
    { path: '*', Component: Not },
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, Component: Home },
            {
                path: 'search',
                children: [
                    { index: true, Component: Search },
                    { path: ':keyword', Component: SearchWithKeyword },
                ],
            },
            {
                path: 'playlist',
                children: [
                    { index: true, Component: Playlist },
                    { path: ':id', Component: PlaylistDetail },
                ],
            },
        ],
    },
]);
