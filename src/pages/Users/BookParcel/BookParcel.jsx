import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Textarea } from "@/src/components/ui/textarea";

import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useLoadUser from "@/src/hooks/useLoadUser";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import Swal from "sweetalert2";
import useBookParcel from "@/src/hooks/useBookParcel";

const BookParcel = () => {
    const [webUser] = useLoadUser()
    const { myParcels,refetch } = useBookParcel(); 

    const form = useForm();
    const axiosSecure = useAxiosSecures()

    const handleFormSubmits = async (data) => {

        const parcelWeightInt = parseInt(data.parcelWeight);
        let price;
        if (parcelWeightInt <= 1) {
            price = 50
        }
        else if (parcelWeightInt <= 2) {
            price = 100;
        }
        else {
            price = 150;
        }

        const parcelInfo = {
            ...data,
            price,
            name: webUser?.displayName,
            email: webUser?.email,
            bookingDate: new Date(),
            userId: webUser?._id,
            status: "pending",
            photoURL:webUser?.photoURL
        }
        refetch()
       

        try {
            const response = await axiosSecure.post("book-parcel", { ...parcelInfo })
            console.log(parcelInfo)

            if (response.data.acknowledged) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your parcel is book successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.message}`,
                footer: '<a href="#">Why do I have this issue?</a>'
            });

        }





    };


    return (
        <div className="  flex items-center justify-center">
            <div className=" w-full p-8 bg-white rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-8">
                    Book a Parcel
                </h1>

                <Form {...form}>
                    <form className=" grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={form.handleSubmit(handleFormSubmits)}>
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder={webUser?.displayName}
                                            {...field}
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email"
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                            placeholder={webUser?.email} {...field} readOnly />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* phoneNumberField */}
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="tel"
                                            required
                                            placeholder="Enter your phone number"
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Parcel Type */}
                        <FormField
                            control={form.control}
                            name="parcelType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parcel Type</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            required
                                            placeholder="Enter parcel type"
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Parcel Weight */}
                        <FormField
                            control={form.control}
                            name="parcelWeight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parcel Weight (kg)</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            required
                                            type="number"
                                            placeholder="Enter parcel weight"
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Receiver's Name */}
                        <FormField
                            control={form.control}
                            name="receiverName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver’s Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            required
                                            placeholder="Enter receiver's name"
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Receiver's Phone Number */}
                        <FormField
                            control={form.control}
                            name="receiverPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver's Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            required
                                            type="tel"
                                            placeholder="Enter receiver's phone number"
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        {/* Requested Delivery Date */}
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


                        {/* Latitude Field */}
                        <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter latitude"
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Longitude Field */}
                        <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter longitude"
                                            className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />



                        {/* Parcel Delivery Address */}
                        <div className="lg:col-span-2">
                            <FormField
                                control={form.control}
                                name="deliveryAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parcel Delivery Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter the delivery address"
                                                className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>



                        {/* Submit Button */}
                        <Button type="submit" className="w-full lg:col-span-2   bg-[#9538E2]">
                            Submit
                        </Button>
                    </form>
                </Form>

            </div>
        </div>
    );
};

export default BookParcel;
