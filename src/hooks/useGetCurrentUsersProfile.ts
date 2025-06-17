import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";
import { getCurrentUsersProfile } from "../apis/userApi";

const useGetCurrentUsersProfile = () => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["current-users-profile", token],
    queryFn: getCurrentUsersProfile,
    enabled: !!token,
  });
};

export default useGetCurrentUsersProfile;
