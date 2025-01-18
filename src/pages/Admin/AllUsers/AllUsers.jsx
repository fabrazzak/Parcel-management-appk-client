import { AuthContext } from "@/src/components/custom/ContextProvider";
import Loading from "@/src/components/custom/Loading/Loading";
import { Button } from "@/src/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/src/components/ui/table";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import useLoadUser from "@/src/hooks/useLoadUser";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const AllUsers = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [webUser] = useLoadUser();
    const axiosSecure = useAxiosSecures();

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

    const handleRoleChange = async (email, role) => {
        try {
            if (role === "user") {
                Swal.fire({
                    title: "Are you sure?",
                    text: `If you remove it, this user will be a normal ${role}.`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await axiosSecure.put('/users', { email, role });
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: `Your ${role} role has been removed.`,
                            icon: "success",
                        });
                    }
                });
            } else {
                await axiosSecure.put('/users', { email, role });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `This user is now a ${role}`,
                    showConfirmButton: false,
                    timer: 2500,
                });
                refetch();
            }
        } catch (error) {
            toast(<p className="text-white p-2 bg-red-500">Failed to update role. Please try again.</p>);
        }
    };

    const handlePageClick = (value) => {
        if (value === "increase") {
            if (data.totalPages >= currentPage + 2) {
                setCurrentPage(currentPage + 1);
            } else {
                toast(<p className="text-red-500">This is the last page.</p>);
            }
        } else if (value === "decrease") {
            if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
            } else {
                toast(<p className="text-red-500">This is the first page.</p>);
            }
        } else {
            setCurrentPage(value);
        }
    };

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md overflow-x-auto  w-[360px] lg:w-full md:w-[700px] mx-auto ">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <h1 className="text-3xl font-bold text-[#9538E2]">
                    User Management
                </h1>
                <h3 className="text-xl font-semibold text-[#9538E2]">
                    Total Users: {data?.totalUsers}
                </h3>
            </div>

            {/* Table */}
            <div className=" rounded-lg border border-gray-300 mb-6">
                <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                        <TableRow className="bg-[#9538E2] divide-x-2 divide-gray-200 text-white hover:bg-[#9538E2]">
                            <TableCell className="text-sm font-bold text-white   px-4 py-3 sm:px-6">Name</TableCell>
                            <TableCell className="text-sm font-bold text-white  px-4 py-3 sm:px-6">Phone Number</TableCell>
                            <TableCell className="text-sm font-bold text-white  px-4 py-3 sm:px-6">No. of P. Booked</TableCell>
                            <TableCell className="text-sm font-bold text-white  px-4 py-3 sm:px-6">Total Spent</TableCell>
                            <TableCell className="text-sm font-bold text-white  text-center px-4 py-3 sm:px-6">Admin</TableCell>
                            <TableCell className="text-sm font-bold text-white  text-center px-4 py-3 sm:px-6">Delivery Man</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.users?.map((user, index) => (
                            <TableRow key={index} className="hover:bg-gray-50 divide-x-2 divide-gray-200 transition-colors">
                                <TableCell className="px-4 py-3 sm:px-6 font-medium text-gray-800">{user.displayName}</TableCell>
                                <TableCell className="px-4 py-3 sm:px-6 text-gray-600">{user?.phoneNumber }</TableCell>
                                <TableCell
                                    className='px-4 py-3 sm:px-6 capitalize font-semibold' >
                                    {user?.parcelsBooked}
                                </TableCell> <TableCell
                                    className='px-4 py-3 sm:px-6 capitalize font-semibold' >
                                    {user?.totalSpentAmount}
                                </TableCell>
                                <TableCell className="px-4 py-3 sm:px-6 text-center">
                                    <Button
                                        className={`text-white ${user.role === "admin"
                                                ? "hover:bg-red-600 bg-red-500"
                                                : "hover:bg-indigo-700 bg-indigo-600"
                                            }`}
                                        onClick={() => handleRoleChange(user.email, user.role === "admin" ? "user" : "admin")}
                                    >
                                        {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                                    </Button>
                                </TableCell>
                                <TableCell className="px-4 py-3 sm:px-6 text-center">
                                    <Button
                                        className={`text-white ${user.role === "delivery-man" ? "hover:bg-red-600 bg-red-500" : "hover:bg-purple-700 bg-purple-600"
                                            }`}
                                        onClick={() => handleRoleChange(user.email, user.role === "delivery-man" ? "user" : "delivery-man")}
                                    >
                                        {user.role === "delivery-man" ? "Remove Delivery Man" : "Make Delivery Man"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="my-6">
                <Pagination className="flex justify-center items-center space-x-2">
                    <PaginationContent className="flex space-x-1">
                        <PaginationItem>
                            <PaginationPrevious onClick={() => handlePageClick("decrease")} href="#" />
                        </PaginationItem>
                        {Array.from({ length: data?.totalPages || 0 }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => handlePageClick(index)}
                                    href="#"
                                    isActive={index === currentPage}
                                    className={`text-white  rounded-full w-8 h-8 flex justify-center items-center ${ index === currentPage ? "bg-gray-900 text-white hover:bg-purple-700 ":"bg-purple-600 hover:bg-purple-700"}`}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext onClick={() => handlePageClick("increase")} href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AllUsers;
