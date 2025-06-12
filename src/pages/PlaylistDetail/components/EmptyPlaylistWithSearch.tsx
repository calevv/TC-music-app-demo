import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
type Props = {};
const EmptyPlaylistWithSearch = (props: Props) => {
    const [keyword, setKeyword] = useState<string>('');
    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <Box
            my="20px"
            mx="20px"
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}
        >
            <Typography variant="h1">Let's find something for your playlist</Typography>
            <TextField value={keyword} onChange={handleSearchKeyword} />
        </Box>
    );
};
export default EmptyPlaylistWithSearch;
