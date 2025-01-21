import React, { useState } from 'react';
import useAxiosSecures from './useAxiosSecures';
import useLoadUser from './useLoadUser';
import { useQuery } from '@tanstack/react-query';

const useAllGetUsers = () => {
    const axiosSecure=useAxiosSecures()
      const [currentPage, setCurrentPage] = useState(0);
      const [pageCount, setPageCount] = useState(0);
      const [webUser] = useLoadUser();
     const { data, refetch, isPending } = useQuery({
            queryKey: ["users", currentPage],
            queryFn: async () => {
                const res = await axiosSecure.get(`/users?page=${currentPage + 1}&limit=5`);
                setPageCount(Math.ceil(res.data.users / 5));
                console.log(res.data)
                return res.data;
            },
            onError: (error) => {
                console.error("Error fetching users:", error);
            },
        });

    return  {data,setCurrentPage,refetch,currentPage,isPending}
};

export default useAllGetUsers;