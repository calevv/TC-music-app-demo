import { Box, Button, styled, Typography } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const Head = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
});

export const LibHead = () => {
    const handleCreatePlaylist = () => {
        //나중에 추가
    };

    return (
        <Head>
            <Box display="flex">
                <BookmarkIcon sx={{ marginRight: '20px' }} />
                <Typography variant="h2" fontWeight={700}>
                    Your Library
                </Typography>
            </Box>
            <Button onClick={handleCreatePlaylist}>
                <AddIcon />
            </Button>
        </Head>
    );
};
