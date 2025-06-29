import {
    AddItemParams,
    AddItemResponse,
    CreatePlaylistRequest,
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

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<Playlist> => {
    try {
        const { name, playlistPublic, collaborative, description } = params;
        const response = await api.post(`/users/${user_id}/playlists`, {
            name,
            public: playlistPublic,
            collaborative,
            description,
        });
        return response.data;
    } catch (error) {
        throw new Error('fail to create Playlist');
    }
};

export const addTracksToPlaylist = async (playlistId: string, params: AddItemParams): Promise<AddItemResponse> => {
    try {
        const { uris, position } = params;
        const response = await api.post(`/playlists/${playlistId}/tracks`, { uris, position });

        return response.data;
    } catch (error) {
        throw new Error('fail to add Playlist');
    }
};
