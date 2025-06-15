import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlaylist } from '../apis/playlistApi';
import useGetCurrentUsersProfile from './useGetCurrentUsersProfile';
import { CreatePlaylistRequest } from '../models/playlist';

const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const { data: user } = useGetCurrentUsersProfile();
    return useMutation({
        mutationFn: (params: CreatePlaylistRequest) => {
            if (user?.id) {
                return createPlaylist(user.id, params);
            }
            return Promise.reject(new Error('user is not undefined'));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
            console.log('useCreatePlaylist 성공');
        },
    });
};

export default useCreatePlaylist;
