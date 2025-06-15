import { useMutation, useQueryClient } from '@tanstack/react-query'; // useQueryClient 가져오기
import { addTracksToPlaylist } from '../apis/playlistApi';
import { usePlaylistStore } from '../stores/usePlaylistStore';
import { AddItemParams } from '../models/playlist';

const useAddPlaylistItem = () => {
    const playlistId = usePlaylistStore((state) => state.playlistId);
    const queryClient = useQueryClient(); // queryClient 초기화

    return useMutation({
        mutationFn: (params: AddItemParams) => {
            if (!playlistId) {
                throw new Error('플레이리스트 ID가 없습니다. 트랙을 추가할 수 없습니다.');
            }
            return addTracksToPlaylist(playlistId, params);
        },
        onSuccess: () => {
            console.log('🎉 트랙이 플레이리스트에 추가됐어요!');
            // 업데이트된 데이터를 다시 가져오기 위해 플레이리스트 상세 쿼리를 무효화합니다.
            queryClient.invalidateQueries({ queryKey: ['playlist-detail', playlistId] });
            queryClient.invalidateQueries({ queryKey: ['playlist-items', playlistId] });
        },
        onError: (error) => {
            console.error('🚨 추가 실패:', error);
        },
    });
};
export default useAddPlaylistItem;
