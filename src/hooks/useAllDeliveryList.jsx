import useAxiosSecures from "./useAxiosSecures";
import { useQuery } from "@tanstack/react-query";
import useLoadUser from "./useLoadUser";

const useAllDeliveryList = () => {
    const axiosSecure = useAxiosSecures();
    const [webUser]=useLoadUser()

    const { data:deliveryList=[], refetch, isLoading, isError, error } = useQuery({
        queryKey: ["delivery-list", webUser?._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-delivery-list/${webUser._id}`);            
            return res.data;
        },
        onError: (error) => {
            console.error("Error fetching delivery men:", error);
        },
        enabled: !!webUser?._id,
    });    

    return {
        deliveryList,
        refetch,        
        isLoading,
        isError,
        error, 
    };
};

export default useAllDeliveryList;
