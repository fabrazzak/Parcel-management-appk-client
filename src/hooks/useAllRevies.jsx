import useAxiosSecures from "./useAxiosSecures";
import { useQuery } from "@tanstack/react-query";
import useLoadUser from "./useLoadUser";

const useAllReviews = () => {
    const axiosSecure = useAxiosSecures();
    const [webUser]=useLoadUser()

    const { data:reviews=[], refetch, isLoading, isError, error } = useQuery({
        queryKey: ["reviews", webUser?._id],
        queryFn: async () => {
            const res =   await axiosSecure.get(`/delivery-man-reviews?deliveryManID=${webUser?._id}` );        
            return res.data;
        },
        onError: (error) => {
            console.error("Error fetching delivery men:", error);
        },
        enabled: !!webUser?._id,
    });    

    return {
        reviews,
        refetch,        
        isLoading,
        isError,
        error, 
    };
};

export default useAllReviews;