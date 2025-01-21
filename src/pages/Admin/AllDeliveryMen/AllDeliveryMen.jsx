
import Loading from "@/src/components/custom/Loading/Loading";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/src/components/ui/pagination";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/src/components/ui/table";
import useAllDeliveryman from "@/src/hooks/useAllDeliveryman";
import { Rating } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";

const AllDeliveryMen = () => {
    const { data, currentPage, setCurrentPage, isLoading } = useAllDeliveryman();

    console.log(data, "all delivery amn")


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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md overflow-x-auto  w-[360px] lg:w-full md:w-[700px] mx-auto ">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <h1 className="text-3xl font-bold text-[#9538E2]">
                    Delivery Man Management
                </h1>
                <h3 className="text-xl font-semibold text-[#9538E2]">
                    Total Delivery Man : {data?.totalDeliveryMan}
                </h3>
            </div>
            <Helmet>
                <title> All Delivery || Man Parcel Management </title>
                
            </Helmet>

            {/* Table */}
            <div className=" rounded-lg border border-gray-300 mb-6">
                <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                        <TableRow className="bg-[#9538E2] divide-x-2 divide-gray-200 text-white hover:bg-[#9538E2]">
                            <TableCell className="text-sm font-bold text-white   px-4 py-3 sm:px-6">Name</TableCell>
                            <TableCell className="text-sm font-bold text-white  px-4 py-3 sm:px-6">Phone Number</TableCell>
                            <TableCell className="text-sm font-bold text-white  px-4 py-3 sm:px-6">Number of parcels delivered</TableCell>
                            <TableCell className="text-sm font-bold text-white   px-4 py-3 sm:px-6">Average review</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? <Loading></Loading> :

                            data?.deliveryMan?.map((user, index) => (
                                <TableRow key={index} className="hover:bg-gray-50 divide-x-2 divide-gray-200 transition-colors">
                                    <TableCell className="px-4 py-3 sm:px-6 font-medium text-gray-800">{user.displayName}</TableCell>
                                    <TableCell className="px-4 py-3 sm:px-6 text-gray-600">{user?.phoneNumber} </TableCell>
                                    <TableCell
                                        className={`px-4 py-3 sm:px-6 capitalize font-semibold `}
                                    >
                                        {user.parcelDelivered
                                        }
                                    </TableCell>
                                    <TableCell className="px-4 py-3 sm:px-6 text-center">
                                        {user?.reviewAverage == 0 ? "N/A" : <div className=" flex content-center items-center gap-2 font-bold"><Rating name="read-only" value={user.reviewAverage} readOnly />{user.reviewAverage}</div>}

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
                                    className={`text-white  rounded-full w-8 h-8 flex justify-center items-center ${index === currentPage ? "bg-gray-900 text-white hover:bg-purple-700 " : "bg-purple-600 hover:bg-purple-700"}`}
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

export default AllDeliveryMen;
