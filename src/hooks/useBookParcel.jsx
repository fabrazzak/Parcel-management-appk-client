import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "./useAxiosSecures";
import useLoadUser from "./useLoadUser";
import Loading from "../components/custom/Loading/Loading";

const useBookParcel = () => {
  const axiosSecure = useAxiosSecures();
  const [webUser] = useLoadUser();

  const { data: myParcels = [], refetch, isLoading, error,isPending } = useQuery({
    queryKey: ["my-parcel", webUser?.email],
    queryFn: async () => {
      if (!webUser?.email) {
        return []; // If email is not available, return an empty array
      }
      const response = await axiosSecure.get(`book-parcels/${webUser?.email}`);
      
      return response.data;
    },
    enabled: !!webUser?.email, // Only fetch if the user is logged in
  });

  return { myParcels, refetch, isLoading, error,isPending };
};

export default useBookParcel;
