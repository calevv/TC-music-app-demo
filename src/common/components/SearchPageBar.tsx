import { InputAdornment, styled, TextField } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
const SearchPageBar = () => {
    const StyledTextField = styled(TextField)(({ theme }) => ({
        width: '80%',
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'center',

        '& .MuiInputBase-root': {
            borderRadius: '4px', // 입력 필드의 둥근 모서리
            backgroundColor: theme.palette.action.active, // 입력 필드의 배경 색상
            color: 'white', // 텍스트 색상
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent', // 테두리 색상 제거
            },
            '&:hover fieldset': {
                borderColor: 'gray', // 마우스 호버 시 테두리 색상
            },
            '&.Mui-focused fieldset': {
                borderColor: 'gray', // 포커스 시 테두리 색상
            },
        },
    }));
    return (
        <div>
            {' '}
            <StyledTextField
                //value={keyword}
                autoComplete="off"
                variant="outlined"
                placeholder="Search for songs or episodes"
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                    },
                }}
                //onChange={handleSearchKeyword}
            />
            <Outlet />
        </div>
    );
};

export default SearchPageBar;
