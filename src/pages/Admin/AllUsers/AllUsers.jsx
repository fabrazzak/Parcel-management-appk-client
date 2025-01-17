import { AuthContext } from "@/src/components/custom/ContextProvider";
import Loading from "@/src/components/custom/Loading/Loading";
import { Button } from "@/src/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/src/components/ui/table";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import useLoadUser from "@/src/hooks/useLoadUser";

import { useQuery } from "@tanstack/react-query";

import {  useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";



const AllUsers = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [webUser]=useLoadUser()
  


    const axiosSecure = useAxiosSecures();

    const { data, refetch, isPending } = useQuery({
        queryKey: ["users", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage + 1}&limit=5`);
            setPageCount(Math.ceil(res.data.users / 5))

            return res.data;
        },
        onError: (error) => {
            console.error("Error fetching users:", error);
        },
    });


    const handleRoleChange = async (email, role) => {

        try {
            if(role=="user"){
                Swal.fire({
                    title: "Are you sure?",
                    text: `If you remove it, this user will be a normal  ${role} . `,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then(async(result) => {
                    if (result.isConfirmed) {
                      await  axiosSecure.put('/users', {email, role });
                      refetch()
                      Swal.fire({
                        title: "Deleted!",
                        text: `Your ${role}  role has been remove.`,
                        icon: "success"
                      });
                    }
                  });
            }else{
                await axiosSecure.put('/users', {email, role });              
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `This  user is a ${role} `,
                    showConfirmButton: false,
                    timer: 2500
                  });
                  refetch();

            }
           



           
         
        } catch (error) {

            toast(<p className="text-white p-2 bg-red-500">Failed to update role. Please try again</p>);
        }
    };

    const handlePageClick = (value) => {



        if (value == "increase") {
            if (data.totalPages >= currentPage + 2) {
                return setCurrentPage(currentPage + 1)
            }
            toast(<p className="text-red-500">This is Last Page</p>)

        }
        else if (value == "decrease") {
            if (currentPage > 0) {
                return setCurrentPage(currentPage - 1)
            }
            toast(<p className="text-red-500"> This is First Page</p>)
        }
        else {
            setCurrentPage(value)

        }



    };

    if (isPending) {
        <Loading></Loading>
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex  justify-between flex-wrap">
                <h1 className="text-2xl font-bold mb-4 text-[#9538E2]"  >
                    User Management {webUser.displayName + webUser?.email}
                </h1>
                <h3 className="text-xl font-bold  mb-4 text-[#9538E2]"  >
                    Total User {data?.totalUsers}
                </h3>
            </div>
            <div className=" max-w-[310px]  md:max-w-full rounded-lg border border-gray-300">
                <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableCell className="text-sm font-semibold text-gray-600 px-6 py-3">
                                Name
                            </TableCell>
                            <TableCell className="text-sm font-semibold text-gray-600 px-6 py-3">
                                Email
                            </TableCell>
                            <TableCell className="text-sm font-semibold text-gray-600 px-6 py-3">
                                Role
                            </TableCell>
                            <TableCell className="text-sm font-semibold text-gray-600 text-center px-6 py-3">
                                Admin
                            </TableCell>
                            <TableCell className="text-sm font-semibold text-gray-600 text-center px-6 py-3">
                                Delivery Man
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.users.map((user, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <TableCell className="px-6 py-4 font-medium text-gray-800">
                                    {user.displayName}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-gray-600">
                                    {user.email}
                                </TableCell>
                                <TableCell className={`px-6 py-4  capitalize font-semibold ${user?.role == "admin" ?  "text-red-600 " : (user?.role == "delivery-man" ? "text-purple-600" : "text-blue-600") }`}>
                                    {user.role}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-center">
                                    <Button 
                                        className={`  text-white ${user.role=="admin" ? " hover:bg-red-600 bg-red-500" :" hover:bg-indigo-700 bg-indigo-600"}`}
                                        onClick={() => handleRoleChange(user.email, user.role=="admin"? "user":"admin")}
                                    >
                                        {user.role == "admin" ? "Remove Admin" : "Make Admin"}
                                    </Button>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-center">
                                    <Button 
                                        className={` text-white ${user.role=="delivery-man"? " hover:bg-red-600 bg-red-500": " hover:bg-purple-700 bg-purple-600"} `}
                                        onClick={() => handleRoleChange(user.email, user.role=="delivery-man"? "user":"delivery-man")}
                                    >
                                        {user.role == "delivery-man" ? "Remove Delivery Man" : "Make Delivery Man"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>


                </Table>
                <div className="my-4">


                    <Pagination>

                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={() => handlePageClick("decrease")} href="#" />
                            </PaginationItem>

                            {
                                Array.from({ length: data?.totalPages || 0 }).map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink onClick={() => handlePageClick(index)} href="#" isActive={index == currentPage && true} >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }





                            <PaginationItem>
                                <PaginationNext onClick={() => handlePageClick("increase")} href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

            </div>
            <ToastContainer />

        </div>
    );
};

export default AllUsers;
