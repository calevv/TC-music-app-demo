import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore';
import { getCurrentUsersProfile } from '../apis/userApi';

const useGetCurrentUsersProfile = () => {
    const { isAuthenticated, token } = useAuthStore();

    return useQuery({
        queryKey: ['current-users-profile', token],
        queryFn: getCurrentUsersProfile,
        enabled: isAuthenticated && !!token,
        retry: (failureCount, error: any) => {
            // 401 에러면 재시도하지 않음
            if (error?.response?.status === 401) {
                return false;
            }
            return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};

export default useGetCurrentUsersProfile;
