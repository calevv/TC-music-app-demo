import { useQuery } from "@tanstack/react-query";
import { getCurrentUsersProfile } from "../apis/userApi";

const useGetCurrentUsersProfile = () => {
  return useQuery({
    queryKey: ["current-users-profile"],
    queryFn: getCurrentUsersProfile,
  });
};
