import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import { Calendar } from "@/src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, isWithinInterval, parseISO } from "date-fns";
import Swal from "sweetalert2";
import useAllDeliveryList from "@/src/hooks/useAllDeliveryList";

const MyDeliveryList = () => {

    const { deliveryList, refetch } = useAllDeliveryList()
    const [bookings, setBookings] = useState([...deliveryList]);
    const axiosSecure = useAxiosSecures()
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    useEffect(() => {
        setBookings([...deliveryList]);
    }, [deliveryList]);



    const handleBookingStatus = async (id, status) => {

        Swal.fire({
            title: "Are you sure?",
            text: `If you update it, this status will be a  ${status}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes,  it!`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.put("book-parcel", { id: id, bookingStatus: status })
                refetch();
                Swal.fire({
                    title: "Updated Done",
                    text: `Your ${status} status  has been update.`,
                    icon: "success",
                });
            }
        });
        
       

    };


    const handleViewLocation = async (data) => {

        const response = await axiosSecure.put("assign-book-parcel", { data })
        console.log(response)
        refetch();
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


    return (
        <div className="container mx-auto p-8 rounded-lg shadow-lg bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <h1 className="text-3xl font-bold text-[#9538E2]">
                    My Delivery List
                </h1>
                <h3 className="text-xl font-semibold text-[#9538E2]">
                    Total Parcels: {bookings?.length}
                </h3>
            </div>


            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">


                <div className="flex flex-wrap gap-4 items-center ">
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
                                    disabled={(date) => date > (dateTo)}
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
                            <th className="px-4 py-2">Booked User's Name</th>
                            <th className="px-4 py-2">Receivers name</th>
                            <th className="px-4 py-2">Booked User's Phone</th>
                            <th className="px-4 py-2">Approximate Delivery Date</th>
                            <th className="px-4 py-2">Receivers phone number</th>
                            <th className="px-4 py-2">View location</th>
                            <th className="px-4 py-2" >Status</th>

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
                                <td className="px-4 py-2"><Button disabled={false}
                                    className="bg-[#9538E2] text-white"
                                    onClick={() => handleViewLocation()}
                                >
                                    See Location
                                </Button></td>
                                <td className={`px-4 py-2 capitalize font-semibold flex gap-4 justify-between`}>
                                    <Button disabled={booking?.status == "canceled" || booking.status=="delivered"}
                                        className="bg-[#9538E2] text-white"
                                        onClick={() => handleBookingStatus(booking._id, "canceled")}
                                    >
                                        {
                                            booking.status == "canceled" ? "Canceled" : "Cancel"
                                        }
                                    </Button>
                                    <Button disabled={booking?.status == "canceled" || booking.status=="delivered"}
                                        className="bg-[#9538E2] text-white"
                                        onClick={() => handleBookingStatus(booking._id, 'delivered')}
                                    >
                                        {
                                            booking.status == "delivered" ? "Delivered" : "Deliver"
                                        }
                                    </Button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


        </div>
    );
};

export default MyDeliveryList;
