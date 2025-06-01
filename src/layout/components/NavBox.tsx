import React from 'react';
import { styled } from '@mui/material';
import { NavLink } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';

const NavList = styled('ul')(({ theme }) => ({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    color: theme.palette.text.secondary,
    '&:hover': {
        color: theme.palette.text.primary,
    },
    '&.active': {
        color: theme.palette.text.primary,
    },
}));
const NavBox = () => {
    return (
        <NavList>
            {' '}
            <StyledNavLink to="/">
                <HomeIcon />{' '}
                <Typography variant="h2" fontWeight={700}>
                    Home
                </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
                <SearchIcon />
                <Typography variant="h2" fontWeight={700}>
                    Search
                </Typography>
            </StyledNavLink>
        </NavList>
    );
};
export default NavBox;
