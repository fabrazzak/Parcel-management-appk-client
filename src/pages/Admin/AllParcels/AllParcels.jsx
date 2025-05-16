import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import useAllGetBookParcels from "@/src/hooks/useAllGetBookParcels";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, isWithinInterval, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import useLoadUser from "@/src/hooks/useLoadUser";
import Swal from "sweetalert2";
import useAllDeliveryman from "@/src/hooks/useAllDeliveryman";
import Loading from "@/src/components/custom/Loading/Loading";
import { Helmet } from "react-helmet-async";

const AllParcels = () => {
  const { allBookParcels, refetch } = useAllGetBookParcels();
  const { data } = useAllDeliveryman();
  const [bookings, setBookings] = useState([...allBookParcels]);
  const [showAlert, setShowAlert] = useState(false);
  const [webUser] = useLoadUser();
  const form = useForm();
  const axiosSecure = useAxiosSecures();
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookings([...allBookParcels]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [allBookParcels]);

  const handleDeliveryManFormSubmits = async (data) => {
    setShowAlert(false);
    const deliveryInfo = {
      parcelId: selectedBookingId,
      approximateDeliveryDate: data.deliveryDate,
      deliveryManID: data.deliveryMan,
      status: "on-the-way",
    };
    await axiosSecure.put("assign-book-parcel", deliveryInfo);
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
    <div className="container mx-auto p-8 rounded-lg shadow-lg bg-white overflow-x-auto w-[360px] lg:w-full md:w-[700px]">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-[#9538E2]">All Parcels</h1>
        <h3 className="text-xl font-semibold text-[#9538E2]">
          Total Parcels: {bookings?.length}
        </h3>
      </div>

      <Helmet>
        <title>All Parcels || Parcel Management</title>
      </Helmet>

      {/* Filter Section */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Date From */}
          <Popover>
            <PopoverTrigger asChild>
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

          {/* Date To */}
          <Popover>
            <PopoverTrigger asChild>
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

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-[#9538E2] text-white divide-x-2">
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Booking Date</th>
              <th className="px-4 py-2">Requested Delivery Date</th>
              <th className="px-4 py-2">Cost</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr key={booking._id} className="border-b divide-x-2">
                <td className="px-4 py-2">{booking.name}</td>
                <td className="px-4 py-2">{booking.phoneNumber}</td>
                <td className="px-4 py-2">
                  {booking?.bookingDate?.slice(0, 10)}
                </td>
                <td className="px-4 py-2">
                  {booking?.deliveryDate?.slice(0, 10)}
                </td>
                <td className="px-4 py-2">{booking.price}</td>
                <td
                  className={`px-4 py-2 capitalize font-semibold ${
                    booking.status === "canceled"
                      ? "text-red-500"
                      : booking.status === "pending"
                      ? "text-purple-600"
                      : "text-orange-500"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="px-4 py-2">
                  <Button
                    disabled={
                      booking?.status === "canceled" ||
                      booking?.status === "delivered"
                    }
                    className="bg-[#9538E2] text-white"
                    onClick={() => {
                      setShowAlert(true);
                      setSelectedBookingId(booking._id);
                    }}
                  >
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alert Dialog for Delivery Man Assignment */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white p-6 rounded-lg shadow-xl">
          <AlertDialogTitle>
            Please Select Delivery Man And Date
          </AlertDialogTitle>
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(handleDeliveryManFormSubmits)}
            >
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
                            {data?.deliveryMan?.map((man) => (
                              <SelectItem key={man?._id} value={man?._id}>
                                {man?.displayName}
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
              <FormField
                control={form.control}
                name="deliveryDate"
                rules={{ required: "Delivery Date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex w-[300px] justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  className="bg-[#9538E2] text-white hover:bg-[#7f2bc7]"
                >
                  Assign
                </Button>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllParcels;
