import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/useAuthStore';
import LoginButton from '../../common/components/LoginButton';
import useGetCurrentUsersProfile from '../../hooks/useGetCurrentUsersProfile';
import { Avatar, Box, IconButton, Menu, MenuItem, styled } from '@mui/material';

const ProfileContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '8px',
});

const ProfileMenu = styled(Menu)({
    '& .MuiPaper-root': {
        color: 'white',
        minWidth: '160px',
    },
});

const ProfileMenuItem = styled(MenuItem)({
    '&:hover': {
        backgroundColor: '#444',
    },
});

const NavBar = () => {
    const { isAuthenticated, logout: authLogout, initialize } = useAuthStore();
    const { data: userProfile } = useGetCurrentUsersProfile();
    const queryClient = useQueryClient();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    console.log('NavBar render - isAuthenticated:', isAuthenticated, 'userProfile:', !!userProfile);

    // 컴포넌트 마운트 시 인증 상태 확인
    useEffect(() => {
        initialize();
    }, [initialize]);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        console.log('Logout clicked');

        // 1. Zustand 스토어에서 로그아웃
        authLogout();

        // 2. React Query 캐시 완전 제거
        queryClient.removeQueries({
            queryKey: ['current-users-profile'],
        });

        // 3. 메뉴 닫기
        handleMenuClose();

        console.log('Logout completed');
    };

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
            {isAuthenticated && userProfile ? (
                <ProfileContainer>
                    <IconButton onClick={handleMenuOpen} size="small">
                        <Avatar src={userProfile.images[0]?.url} alt={userProfile.display_name} />
                    </IconButton>
                    <ProfileMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} keepMounted>
                        <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
                    </ProfileMenu>
                </ProfileContainer>
            ) : (
                <LoginButton />
            )}
        </Box>
    );
};

export default NavBar;
