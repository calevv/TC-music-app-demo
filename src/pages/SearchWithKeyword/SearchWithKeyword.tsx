import { useParams } from 'react-router';
import { SEARCH_TYPE, SearchResponse } from '../../models/search';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import ErrorMessage from '../../common/components/ErrorMessage';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Alert, Box, Grid, Snackbar, SnackbarCloseReason, Typography } from '@mui/material';
import { TrackObject } from '../../models/playlist';
import TopResultBox from './components/TopResultBox';
import SongListBox from './components/SongListBox';
import ArtistBox from './components/ArtistBox';
import AlbumBox from './components/AlbumBox';

const SearchWithKeyword = () => {
    const { keyword } = useParams<{ keyword: string }>();
    const [results, setResults] = useState<SearchResponse | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const types = [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist];
    const { data, isLoading, error } = useSearchItemsByKeyword({
        q: keyword || '',
        type: types,
    });

    const [topResult, setTopResult] = useState<TrackObject | null>(null);

    useEffect(() => {
        if (!isLoading && data) {
            setResults(data.pages[0]);
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (results && results.tracks && results.tracks?.items.length > 0) {
            setTopResult(results.tracks.items[0]);
        } else {
            setTopResult(null);
        }
    }, [results]);
    const handleClose = (event: Event | SyntheticEvent<Element, Event>, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    if (error) {
        return <ErrorMessage errorMessage={error.message} />;
    }
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!results) {
        return <></>;
    }
    if (
        results.albums?.items.length === 0 &&
        results.artists?.items.length === 0 &&
        results.tracks?.items.length === 0
    ) {
        return <Alert severity="warning">'{keyword}'에 대한 결과가 없습니다</Alert>;
    }
    // console.log("results.albums", results.albums);
    return (
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4">Top result</Typography>
                    {results.tracks?.items.length !== 0 && <TopResultBox track={topResult} />}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4">Songs</Typography>
                    {results.tracks?.items.length !== 0 && (
                        <SongListBox tracks={results?.tracks} setOpen={setOpen} setMessage={setMessage} />
                    )}
                </Grid>
            </Grid>
            <Box>
                <Typography variant="h4">Artist</Typography>
                <ArtistBox artists={results?.artists} />
            </Box>
            <Box>
                <Typography variant="h4">Album</Typography>
                <AlbumBox albums={results?.albums} />
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
            />
        </Box>
    );
};

export default SearchWithKeyword;
