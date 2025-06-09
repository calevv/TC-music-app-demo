import { useInfiniteQuery } from '@tanstack/react-query';
import { GetPlaylistItemdRequest } from '../models/playlist';
import { getPlaylistItem } from '../apis/playlistApi';

const useGetPlaylistItem = (params: GetPlaylistItemdRequest) => {
    return useInfiniteQuery({
        queryKey: ['playlist-items', params],
        queryFn: ({ pageParam }) => getPlaylistItem({ offset: pageParam, ...params }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get('offset');
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
            return undefined;
        },
    });
};

export default useGetPlaylistItem;
