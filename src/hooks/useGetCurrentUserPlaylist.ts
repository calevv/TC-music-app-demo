import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylist } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";

interface UseGetCurrentUserPlaylistOptions
  extends GetCurrentUserPlaylistRequest {
  enabled?: boolean;
}

const useGetCurrentUserPlaylist = ({
  limit,
  offset,
  enabled = true,
}: UseGetCurrentUserPlaylistOptions) => {
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylist({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    // 여기에 enabled 옵션을 useInfiniteQuery에 전달합니다.
    enabled: enabled, // 훅으로 받은 enabled 값을 useInfiniteQuery에 전달
  });
};

export default useGetCurrentUserPlaylist;
