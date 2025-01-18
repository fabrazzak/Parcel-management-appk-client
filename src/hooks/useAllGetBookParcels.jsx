
import useAxiosSecures from './useAxiosSecures';
import {  useQuery } from '@tanstack/react-query';

const useAllGetBookParcels = () => {
    const axiosSecure=useAxiosSecures()
    const {data:allBookParcels=[],refetch,isLoading,isPending,error}=useQuery({
        queryKey: ["all-book-parcels"],
        queryFn:async()=>{
            const response= await axiosSecure.get("all-book-parcels");
            return response.data;
        }
        
    })
  
    return {allBookParcels,refetch,isPending,isLoading,error}
};

export default useAllGetBookParcels;