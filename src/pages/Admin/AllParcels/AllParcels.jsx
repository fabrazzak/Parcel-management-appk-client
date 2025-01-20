import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import useAllGetBookParcels from "@/src/hooks/useAllGetBookParcels";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTitle } from "@/src/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Calendar } from "@/src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, isWithinInterval, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import useLoadUser from "@/src/hooks/useLoadUser";
import Swal from "sweetalert2";
import useAllDeliveryman from "@/src/hooks/useAllDeliveryman";

const AllParcels = () => {
    const { allBookParcels, refetch } = useAllGetBookParcels();
    const { data } = useAllDeliveryman();
    const [bookings, setBookings] = useState([...allBookParcels]);
    const [showAlert, setShowAlert] = useState(false);
    const [webUser] = useLoadUser()
    const form = useForm();
    const axiosSecure = useAxiosSecures()
    const [selectedBookingId, setSelectedBookingId] = useState('null');

    const [filteredBookings, setFilteredBookings] = useState([]);


    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    useEffect(() => {
        setBookings([...allBookParcels]);
    }, [allBookParcels]);



    const handleDeliveryManFormSubmits = async (data) => {
        setShowAlert(false);
        const deliveryInfo = {
            parcelId: selectedBookingId,
            approximateDeliveryDate: data.deliveryDate,
            deliveryManID: data.deliveryMan,
            status: "on-the-way"
        }
        const response = await axiosSecure.put("assign-book-parcel", { ...deliveryInfo })
        console.log(response)
        refetch();
    };



    const handleDateSearch = () => {
        if (!dateFrom || !dateTo) return;

        const filtered = allBookParcels.filter((booking) =>
            isWithinInterval(parseISO(booking?.deliveryDate), {
                start: dateFrom,
                end: dateTo,
            })
        );
        setBookings(filtered);
    };


    const resetSearch = () => {
        setDateFrom(null);
        setDateTo(null);
        setBookings([...allBookParcels]);
    };
 

    return (
        <div className="container mx-auto p-8 rounded-lg shadow-lg bg-white overflow-x-auto  w-[360px] lg:w-full md:w-[700px]">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <h1 className="text-3xl font-bold text-[#9538E2]">
                    All Parcels
                </h1>
                <h3 className="text-xl font-semibold text-[#9538E2]">
                    Total Parcels: {bookings?.length}
                </h3>
            </div>


            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">


                <div className="flex flex-wrap gap-4 items-center ">
                    <div className="flex items-center flex-wrap gap-4">
                        <Popover>
                            <PopoverTrigger>
                                <Button variant="outline">
                                    <CalendarIcon className="mr-2" />
                                    {dateFrom ? format(dateFrom, "PPP") : "Date From"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={dateFrom}
                                    onSelect={setDateFrom}
                                    disabled={(date) => date > (dateTo || new Date())}
                                />
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger>
                                <Button variant="outline">
                                    <CalendarIcon className="mr-2" />
                                    {dateTo ? format(dateTo, "PPP") : "Date To"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={dateTo}
                                    onSelect={setDateTo}
                                    disabled={(date) => date < (dateFrom || new Date())}
                                />
                            </PopoverContent>
                        </Popover>

                        <Button className="bg-[#9538E2] text-white" onClick={handleDateSearch}>
                            Search
                        </Button>
                        <Button variant="outline" onClick={resetSearch}>
                            Reset
                        </Button>
                    </div>
                </div>









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
                                <td className="px-4 py-2">{booking?.bookingDate?.slice(0, 10)}</td>
                                <td className="px-4 py-2">{booking?.deliveryDate?.slice(0, 10)}</td>
                                <td className="px-4 py-2">{booking.price}</td>
                                <td className={`px-4 py-2 capitalize font-semibold  ${booking.status == "canceled" ? "text-red-500" : booking.status == "pending" ? "text-purple-600" : "text-orange-500"}`}>{booking.status}</td>
                                <td className="px-4 py-2">
                                    <Button disabled={booking?.status == "canceled" || booking?.status == "delivered"}
                                        className="bg-[#9538E2] text-white"
                                        onClick={() => { setShowAlert(true), setSelectedBookingId(booking._id) }}
                                    >
                                        Manage
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


            <div className="w-[350px]">
                <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                    <AlertDialogContent className="bg-white w-[350px] p-6 rounded-lg shadow-xl">
                        <AlertDialogTitle>Please Select Delivery Man And Date</AlertDialogTitle>
                        <Form {...form}>
                            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleDeliveryManFormSubmits)}>
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="deliveryMan"
                                    rules={{ required: "Delivery man is Required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Delivery man</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-[300px]">
                                                        <SelectValue placeholder="Please Select One" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {data?.deliveryMan?.map((deliveryMan) => (
                                                                <SelectItem key={deliveryMan?._id} value={deliveryMan?._id}>
                                                                    {deliveryMan?.displayName}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Date Picker Field */}
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        rules={{ required: "Delivery Date is required" }}
                                        name="deliveryDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-4">
                                                <FormLabel>Requested Delivery Date</FormLabel>

                                                <Popover>
                                                    <PopoverTrigger>
                                                        <FormControl>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="flex w-[300px] p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                                            >
                                                                <CalendarIcon className="mr-2" />
                                                                {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : null} // Ensure field.value is treated as a Date object
                                                            onSelect={(date) => {
                                                                field.onChange(date); // Properly set the selected date
                                                            }}
                                                            disabled={(date) => date < new Date().setHours(0, 0, 0, 0)} // Disable dates before today
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" className="w-full lg:col-span-2 bg-[#9538E2]">
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
