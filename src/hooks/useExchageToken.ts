import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../stores/useAuthStore';
import { exchageToken } from '../apis/authApi';
import { ExchangeTokenResponse } from '../models/auth';

const useExchageToken = () => {
    const queryClient = useQueryClient();
    const { login } = useAuthStore();

    return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
        mutationFn: ({ code, codeVerifier }) => exchageToken(code, codeVerifier),
        onSuccess: async (data) => {
            console.log('Token exchange successful:', data.access_token);

            // 1. Zustand 스토어에 로그인
            login(data.access_token);

            // 2. 기존 캐시 제거
            queryClient.removeQueries({
                queryKey: ['current-users-profile'],
            });

            // 3. 새로운 프로필 데이터 미리 로드
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ['current-users-profile'],
                });
            }, 100);

            console.log('Login process completed');
        },
        onError: (error) => {
            console.error('Token exchange failed:', error);
        },
    });
};

export default useExchageToken;
