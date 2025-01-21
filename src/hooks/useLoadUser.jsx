import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "./useAxiosSecures";
import { useContext } from "react";
import { AuthContext } from "../components/custom/ContextProvider";

const useLoadUser = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecures();

  const { data: webUser = [], refetch } = useQuery({
    queryKey: ["userData", user?.email], 
    queryFn: async () => {
      if (!user?.email) return []; 
      const response = await axiosSecure.get(`user/${user.email}`); 
      return response.data;
    },
    enabled: !!user?.email, 
  });

 

  return [webUser, refetch];
};

export default useLoadUser;
