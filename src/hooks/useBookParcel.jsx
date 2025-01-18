import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "./useAxiosSecures";
import useLoadUser from "./useLoadUser";
import Loading from "../components/custom/Loading/Loading";

const useBookParcel = () => {
  const axiosSecure = useAxiosSecures();
  const [webUser] = useLoadUser();

  const { data: myParcels = [],refetch, isLoading, error,isPending } = useQuery({
    queryKey: ["my-parcel", webUser?.email],
    queryFn: async () => {
      if (!webUser?.email) {
        return []; 
      }
      const response = await axiosSecure.get(`book-parcels/${webUser?.email}`);  
      
      return response.data;
    },
    enabled: !!webUser?.email,
  });

  return { myParcels, refetch , isLoading, error,isPending };
};

export default useBookParcel;
