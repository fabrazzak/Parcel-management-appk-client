import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import { Calendar } from "@/src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, isWithinInterval, parseISO } from "date-fns";
import Swal from "sweetalert2";
import useAllDeliveryList from "@/src/hooks/useAllDeliveryList";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/src/components/ui/alert-dialog";



const MyDeliveryList = () => {
    const { deliveryList, refetch } = useAllDeliveryList();
    const [bookings, setBookings] = useState([...deliveryList]);
    const axiosSecure = useAxiosSecures();
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    // Initial position state




    useEffect(() => {
        setBookings([...deliveryList]); // Update the booking list whenever deliveryList changes
    }, [deliveryList]);

    const handleBookingStatus = async (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: `If you update it, this status will be ${status}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, it!`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.put("book-parcel", { id: id, bookingStatus: status });
                refetch(); // Refetch after update
                Swal.fire({
                    title: "Updated Done",
                    text: `Your ${status} status has been updated.`,
                    icon: "success",
                });
            }
        });
    };

    const handleViewLocation = (data) => {
        console.log("Selected Parcel:", data);
        setSelectedParcel(data); // Set the selected parcel to display location
        setShowAlert(true); // Open the location modal
    };

    const handleDateSearch = () => {
        if (!dateFrom || !dateTo) return;

        const filtered = deliveryList.filter((booking) =>
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
        setBookings([...deliveryList]);
    };

    const handleConfirmCancel = async () => {
        // Update parcel status to 'canceled'
        await axiosSecure.put("book-parcel", { id: selectedParcel._id, bookingStatus: "canceled" });
        refetch(); // Refetch to update the UI
        setShowAlert(false); // Close the alert dialog
    };

    return (
        <div className="container mx-auto p-8 rounded-lg shadow-lg bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <h1 className="text-3xl font-bold text-[#9538E2]">My Delivery List</h1>
                <h3 className="text-xl font-semibold text-[#9538E2]">
                    Total Parcels: {bookings?.length}
                </h3>
            </div>

            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-4">
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
                                    disabled={(date) => date > dateTo}
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

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="table-auto w-full">
                    <thead className="bg-[#9538E2] divide-x-2 text-white border-stone-300">
                        <tr className="divide-x-2">
                            <th className="px-4 py-2">Booked User's Name</th>
                            <th className="px-4 py-2">Receiver's Name</th>
                            <th className="px-4 py-2">Booked User's Phone</th>
                            <th className="px-4 py-2">Approximate Delivery Date</th>
                            <th className="px-4 py-2">Receiver's Phone Number</th>
                            <th className="px-4 py-2">View Location</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((booking) => (
                            <tr key={booking._id} className="border-b divide-x-2">
                                <td className="px-4 py-2">{booking.name}</td>
                                <td className="px-4 py-2">{booking.receiverName}</td>
                                <td className="px-4 py-2">{booking.phoneNumber}</td>
                                <td className="px-4 py-2">{booking?.approximateDeliveryDate?.slice(0, 10)}</td>
                                <td className="px-4 py-2">{booking.receiverPhone}</td>
                                <td className="px-4 py-2">
                                    <Button
                                        className="bg-[#9538E2] text-white"
                                        onClick={() => handleViewLocation(booking)}
                                    >
                                        See Location
                                    </Button>
                                </td>
                                <td className="px-4 py-2 flex gap-4 justify-between">
                                    <Button
                                        disabled={booking?.status === "canceled" || booking.status === "delivered"}
                                        className="bg-[#9538E2] text-white"
                                        onClick={() => handleBookingStatus(booking._id, "canceled")}
                                    >
                                        {booking.status === "canceled" ? "Canceled" : "Cancel"}
                                    </Button>
                                    <Button
                                        disabled={booking?.status === "canceled" || booking.status === "delivered"}
                                        className="bg-[#9538E2] text-white"
                                        onClick={() => handleBookingStatus(booking._id, "delivered")}
                                    >
                                        {booking.status === "delivered" ? "Delivered" : "Deliver"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent className="bg-white p-6 rounded-lg shadow-xl">
                    <AlertDialogTitle>Location</AlertDialogTitle>
                    <AlertDialogDescription>
                    
                    </AlertDialogDescription>
                    <AlertDialogAction onClick={handleConfirmCancel}>Confirm</AlertDialogAction>
                    <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default MyDeliveryList;
