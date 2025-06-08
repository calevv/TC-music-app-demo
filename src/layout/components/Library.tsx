import React, { useEffect } from 'react';
import { EmptyPlaylist } from './EmptyPlaylist';
import useGetCurrentUserPlaylist from '../../hooks/useGetCurrentUserPlaylist';
import Playlist from '../../pages/Playlist/Playlist';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import { styled } from '@mui/material';
import useGetCurrentUsersProfile from '../../hooks/useGetCurrentUsersProfile';
import { useInView } from 'react-intersection-observer';

const PlaylistContainer = styled('div')(({ theme }) => ({
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 240px)',
    height: '100%',
    '&::-webkit-scrollbar': {
        display: 'none',
        msOverflowStyle: 'none', // IE and Edge
        scrollbarWidth: 'none', // Firefox
    },
    [theme.breakpoints.down('sm')]: {
        maxHeight: 'calc(100vh - 65px - 119px)',
    },
}));

const Library = () => {
    const { ref, inView } = useInView();

    const { data: user, isLoading: isUserLoading, error: userError } = useGetCurrentUsersProfile();

    // user 데이터가 있을 때만 useGetCurrentUserPlaylist 훅을 실행하도록 enabled 옵션 추가
    const {
        data: playlistData,
        isLoading: isPlaylistLoading,
        error: playlistError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetCurrentUserPlaylist({
        limit: 10,
        offset: 0,
        enabled: !!user,
    });
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    // 1. 사용자 프로필 로딩 중이면 로딩 스피너
    if (isUserLoading) {
        return <LoadingSpinner />;
    }

    // 2. 사용자 프로필 로딩 실패 시 에러 메시지
    if (userError) {
        return <ErrorMessage errorMessage={userError.message} />;
    }

    // 3. 사용자 데이터가 없으면 (로그인 안 됨) EmptyPlaylist 표시
    if (!user) {
        return <EmptyPlaylist />;
    }

    // 4. 사용자 데이터는 있지만, 플레이리스트 로딩 중이면 로딩 스피너
    if (isPlaylistLoading) {
        return <LoadingSpinner />;
    }

    // 5. 플레이리스트 로딩 중 에러 발생 시 에러 메시지
    if (playlistError) {
        // 여기서 발생하는 에러는 로그인 후 플레이리스트를 가져오다가 발생한 에러입니다.
        return <ErrorMessage errorMessage={playlistError.message} />;
    }

    // 6. 플레이리스트 데이터가 없거나 비어있으면 EmptyPlaylist
    // data?.pages[0].total === 0 대신 data?.pages.every(page => page.items.length === 0)
    // 또는 data?.pages.length === 0 && data.pages[0].items.length === 0 (만약 pages가 빈 배열일 수 있다면)
    const hasPlaylists = playlistData && playlistData.pages && playlistData.pages.some((page) => page.items.length > 0);

    return (
        <div>
            {!hasPlaylists ? (
                <EmptyPlaylist />
            ) : (
                <PlaylistContainer>
                    {playlistData?.pages.map((page, index) => (
                        <Playlist playlists={page.items} key={index} />
                    ))}
                    <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
                </PlaylistContainer>
            )}
        </div>
    );
};

export default Library;
