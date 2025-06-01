import { styled } from '@mui/material';

export const Layout = styled('div')({
    display: 'flex',
    height: '100vh',
    padding: '10px',
    gap: '10px',
});

export const Sidebar = styled('div')(({ theme }) => ({
    width: '331px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));
export const ContentBox = styled('div')(({ theme }) => ({
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    padding: '10px',
}));
