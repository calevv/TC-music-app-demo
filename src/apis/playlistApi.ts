import {
    GetCurrentUserPlaylistRequest,
    GetCurrentUserPlaylistResponse,
    GetPlaylistItemdRequest,
    GetPlaylistItemdResponse,
    GetPlaylistRequest,
    Playlist,
} from '../models/playlist';
import api from '../utils/api';

export const getCurrentUserPlaylist = async ({
    limit,
    offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
    try {
        const response = await api.get('/me/playlists', {
            params: { limit, offset },
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to fetct current user playlists');
    }
};

export const getPlaylist = async (params: GetPlaylistRequest): Promise<Playlist> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}`, {
            params,
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to fetct playlists detail');
    }
};

export const getPlaylistItem = async (params: GetPlaylistItemdRequest): Promise<GetPlaylistItemdResponse> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
            params,
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to fetct playlists items');
    }
};
