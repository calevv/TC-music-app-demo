import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { searchItemsByKeyword } from '../apis/searchApi';
import useClientCredentialToken from './useClientCredentialToken';
import { SearchRequestParams } from '../models/search';
import axios from 'axios';

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
    const token = useClientCredentialToken();

    return useInfiniteQuery({
        queryKey: ['search', params],
        enabled: !!params.q && !!token,
        initialPageParam: null,
        queryFn: async ({ pageParam }) => {
            if (!token) throw new Error('No token');

            if (typeof pageParam === 'string') {
                const response = await axios.get(pageParam, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            }

            return searchItemsByKeyword(token, { ...params, offset: 0 });
        },
        getNextPageParam: (lastPage) => {
            return (
                lastPage.tracks?.next ||
                lastPage.artists?.next ||
                lastPage.albums?.next ||
                lastPage.playlists?.next ||
                lastPage.show?.next ||
                lastPage.episode?.next ||
                lastPage.audiobook?.next ||
                undefined
            );
        },
    });
};

export default useSearchItemsByKeyword;
