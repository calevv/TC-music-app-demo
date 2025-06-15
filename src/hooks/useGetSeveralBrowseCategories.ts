import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useClientCredentialToken from './useClientCredentialToken';
import { getSeveralBrowseCategories } from '../apis/category';

const useGetSeveralBrowseCategories = () => {
    const clientCredentialToken = useClientCredentialToken();
    return useQuery({
        queryKey: ['get-categories'],
        queryFn: async () => {
            if (!clientCredentialToken) {
                throw new Error('No token available');
            }
            return getSeveralBrowseCategories(clientCredentialToken);
        },
    });
};

export default useGetSeveralBrowseCategories;
