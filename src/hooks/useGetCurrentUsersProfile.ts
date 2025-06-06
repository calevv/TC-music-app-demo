import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore'; // 경로는 실제에 맞게 수정
import { getCurrentUsersProfile } from '../apis/userApi'; // API 함수 경로는 실제에 맞게 수정

const useGetCurrentUsersProfile = () => {
    const { isAuthenticated, token } = useAuthStore();

    return useQuery({
        queryKey: ['current-users-profile', token], // token을 키에 포함
        queryFn: getCurrentUsersProfile,
        enabled: isAuthenticated && !!token, // 토큰이 있을 때만 실행
        retry: (failureCount, error: any) => {
            // 401 에러면 재시도하지 않음
            if (error?.response?.status === 401) {
                return false;
            }
            return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000, // 5분
        refetchOnWindowFocus: false,
    });
};

export default useGetCurrentUsersProfile;
