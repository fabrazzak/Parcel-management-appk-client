import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/src/components/ui/select";

import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import { Pagination } from "@/src/components/ui/pagination";
import useAllGetBookParcels from "@/src/hooks/useAllGetBookParcels";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/src/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Calendar } from "@/src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import useLoadUser from "@/src/hooks/useLoadUser";
import Swal from "sweetalert2";

const AllParcels = () => {
    const { allBookParcels, refetch, isPending, isLoading, error } = useAllGetBookParcels()
    const [bookings, setBookings] = useState([...allBookParcels]);
    const [showAlert, setShowAlert] = useState(false);
    const [webUser] = useLoadUser()
    const form = useForm();
      const [deliveryMen, setDeliveryMen] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    
    //   const [currentPage, setCurrentPage] = useState(1);

    //   const axiosSecure = useAxiosSecures();
    //   const rowsPerPage = 5;

    useEffect(() => {
        setBookings([...allBookParcels]);

    }, [allBookParcels]);



    const handleDeliveryManFormSubmits = async (data) => {

        setShowAlert(false);
        console.log(data)



        // const parcelInfo = {
        //     ...data,
        //     price,
        //     name: webUser?.displayName,
        //     email: webUser?.email,
        //     bookingDate: new Date(),
        //     userId: webUser?._id,
        //     status: "pending"
        // }
        // refetch()


        // try {
        // const response = await axiosSecure.post("book-parcel", { ...parcelInfo })


        //     if (response.data.acknowledged) {
        //         Swal.fire({
        //             position: "top-end",
        //             icon: "success",
        //             title: "Your parcel is book successfully",
        //             showConfirmButton: false,
        //             timer: 1500
        //         });

        //     }

        // } catch (error) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: `${error.message}`,
        //         footer: '<a href="#">Why do I have this issue?</a>'
        //     });

        // }





    };


    return (
        <div className="container mx-auto p-8 rounded-lg shadow-lg bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <h1 className="text-3xl font-bold text-[#9538E2]">
                    All Parcels
                </h1>
                <h3 className="text-xl font-semibold text-[#9538E2]">
                    Total Parcels: {bookings?.length}
                </h3>
            </div>

            {/* Search System */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
                <Input
                    type="date"
                    //   value={searchDateFrom}
                    //   onChange={(e) => setSearchDateFrom(e.target.value)}
                    className="w-1/2 mr-2"
                    placeholder="From Date"
                />
                <Input
                    type="date"
                    //   value={searchDateTo}
                    //   onChange={(e) => setSearchDateTo(e.target.value)}
                    className="w-1/2 ml-2"
                    placeholder="To Date"
                />
                {/* <Button className="bg-[#9538E2] text-white ml-4" onClick={handleSearch}>
          Search
        </Button> */}
            </div>

            {/* Bookings Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="table-auto w-full">
                    <thead className="bg-[#9538E2] divide-x-2 text-white border-stone-300">
                        <tr className="divide-x-2">
                            <th className="px-4 py-2">User Name</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Booking Date</th>
                            <th className="px-4 py-2">Requested Delivery Date</th>
                            <th className="px-4 py-2">Cost</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2" >Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((booking) => (
                            <tr key={booking._id} className="border-b divide-x-2">
                                <td className="px-4 py-2">{booking.name}</td>
                                <td className="px-4 py-2">{booking.phoneNumber}</td>
                                <td className="px-4 py-2">{booking.bookingDate}</td>
                                <td className="px-4 py-2">{booking.deliveryDate}</td>
                                <td className="px-4 py-2">{booking.price}</td>
                                <td className={`px-4 py-2 capitalize font-semibold  ${booking.status == "canceled" ? "text-red-500" : booking.status == "pending" ? "text-purple-600" : "text-orange-500"}`}>{booking.status}</td>
                                <td className="px-4 py-2">
                                    <Button
                                        className="bg-[#9538E2] text-white"
                                        onClick={() => setShowAlert(true)}
                                    >
                                        Manage
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {/* <Pagination
          totalRows={bookings?.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        /> */}
            </div>


            <div className="w-[350px]">
                <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                    <AlertDialogContent className="bg-white w-[350px] p-6 rounded-lg shadow-xl">
                        <AlertDialogTitle>Please Select Delivery Man And Date</AlertDialogTitle>
                        <Form {...form}>
                            <form className=" flex flex-col gap-6" onSubmit={form.handleSubmit(handleDeliveryManFormSubmits)}>
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="deliveryMan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Delivery man</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} // Bind onChange to the form field
                                                    value={field.value} >
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue  placeholder="Please Select One" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>North America</SelectLabel>
                                                            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                                            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                                            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                                            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                                            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                                            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                                                        </SelectGroup>

                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        rules={{ required: "Delivery Date is required" }}
                                        name="deliveryDate"
                                        render={({ field }) => (
                                            <FormItem
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "flex-start",
                                                    gap: "4px",
                                                    with: "100%"
                                                }}
                                            >
                                                <FormLabel >
                                                    Requested Delivery Date
                                                </FormLabel>

                                                <Popover>
                                                    <PopoverTrigger>
                                                        <FormControl >
                                                            <Button type="button"
                                                                variant="outline"
                                                                className=" flex   w-[300px]   p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                                            >
                                                                <CalendarIcon className="mr-2  " />
                                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date < new Date().setHours(0, 0, 0, 0) // Disable all dates before today
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>

                                            </FormItem>
                                        )}
                                    />
                                </div>


                                <Button type="submit" className="w-full lg:col-span-2   bg-[#9538E2]">
                                    Submit
                                </Button>
                            </form>
                        </Form>



                        <AlertDialogCancel className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">No, Keep It</AlertDialogCancel>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </div>
    );
};

export default AllParcels;
