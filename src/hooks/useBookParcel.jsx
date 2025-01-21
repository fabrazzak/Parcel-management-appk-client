import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "./useAxiosSecures";
import useLoadUser from "./useLoadUser";
import Loading from "../components/custom/Loading/Loading";

const useBookParcel = () => {
  const axiosSecure = useAxiosSecures();
  const [webUser] = useLoadUser();

  const { data: myParcels = [],refetch, isLoading, error,isPending,isRefetching } = useQuery({
    queryKey: ["my-parcel", webUser?.email],
    queryFn: async () => {
     
      const response = await axiosSecure.get(`book-parcels/${webUser?.email}`);  
      
      return response.data;
    },
    enabled: !!webUser?.email,
    cacheTime:0,refetchOnMount:"always"
  });

  return { myParcels,refetch,  isLoading, error,isPending ,isRefetching};
};

export default useBookParcel;
