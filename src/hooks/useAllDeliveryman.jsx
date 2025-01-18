import { useState } from "react";
import useAxiosSecures from "./useAxiosSecures";
import { useQuery } from "@tanstack/react-query";

const useAllDeliveryman = () => {
    const [currentPage, setCurrentPage] = useState(0); // Tracks the current page
    const [pageCount, setPageCount] = useState(0); // Total number of pages
    const axiosSecure = useAxiosSecures();

    const { data, refetch, isLoading, isError, error } = useQuery({
        queryKey: ["users", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/delivery-man?page=${currentPage + 1}&limit=5`);
            setPageCount(Math.ceil(res.data.totalDeliveryMen / 5)); // Assuming `totalDeliveryMen` is returned in the response
            return res.data;
        },
        onError: (error) => {
            console.error("Error fetching delivery men:", error);
        },
    });    

    return {
        data,
        refetch,
        currentPage,
        setCurrentPage,
        pageCount,
        setPageCount,
        isLoading,
        isError,
        error, // Expose error details
    };
};

export default useAllDeliveryman;
