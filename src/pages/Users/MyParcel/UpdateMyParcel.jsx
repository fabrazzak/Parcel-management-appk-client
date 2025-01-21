import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Textarea } from "@/src/components/ui/textarea";

import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useLoadUser from "@/src/hooks/useLoadUser";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import Swal from "sweetalert2";
import useBookParcel from "@/src/hooks/useBookParcel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateMyParcel = () => {
  const { id } = useParams(); // Get the parcel ID from the URL
  const { myParcels,refetch,isRefetching} = useBookParcel(); // Load parcels
  const [parcel, setParcel] = useState(null); // State to store the parcel details
  const navigate=useNavigate()
 

  useEffect(() => {
    // Find the parcel by its ID
    const filterParcel = myParcels.find((p) => p._id === id);
    setParcel(filterParcel);
  }, [id, myParcels]);

  const [webUser] = useLoadUser();
  const form = useForm({
    values: {
      name: webUser?.displayName || "",
      email: webUser?.email || "",
      phoneNumber: parcel?.phoneNumber || "",
      parcelType: parcel?.parcelType || "",
      parcelWeight: parcel?.parcelWeight || "",
      receiverName: parcel?.receiverName || "",
      receiverPhone: parcel?.receiverPhone || "",
      deliveryDate: parcel?.deliveryDate || null,
      latitude: parcel?.latitude || "",
      longitude: parcel?.longitude || "",
      deliveryAddress: parcel?.deliveryAddress || "",
    },
  });
  
  const axiosSecure = useAxiosSecures();

  const handleUpdateFormSubmits = async (data) => {
    const parcelWeightInt = parseInt(data.parcelWeight);
    let price;
    if (parcelWeightInt <= 1) {
      price = 50;
    } else if (parcelWeightInt <= 2) {
      price = 100;
    } else {
      price = 150;
    }

    const parcelInfo = {
        ...parcel,
        ...data,
        price,        
    }
    console.log(parcelInfo)
    try {
      const response = await axiosSecure.put("update-book-parcel", { ...parcelInfo  });
    
      
      if (response.data.success) {   
        refetch()        
          
        
        Swal.fire({
              title: "Are you sure?",
              text: `If you update it, .`,
              icon: "warning",              
              confirmButtonColor: "#3085d6",              
              confirmButtonText: "okay",
            }).then(async (result) => {
              if (result.isConfirmed) {  
                navigate(-1)           
              

              }
            });


        
       
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-8">
          Update parcel information
        </h1>

        <Form {...form}>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={form.handleSubmit(handleUpdateFormSubmits)}
          >
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
                    <Input
                      type="email"
                      className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                      placeholder={webUser?.email}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
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
                      placeholder={`${parcel?.phoneNumber}`}
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
                      placeholder={`${parcel?.parcelType}`}
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
                      type="number"
                      placeholder={`${parcel?.parcelWeight}`}
                      className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Receiver Name */}
            <FormField
              control={form.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver’s Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${parcel?.receiverName}`}
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
                      type="tel"
                      placeholder={`${parcel?.receiverPhone}`}
                      className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Requested Delivery Date */}
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requested Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                        >
                          <CalendarIcon className="mr-2" />
                          {field.value
                            ? format(field.value, "PPP")
                            : parcel?.deliveryDate.slice(0, 10)}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date().setHours(0, 0, 0, 0)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* Latitude */}
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${parcel?.latitude}`}
                      className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Longitude */}
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${parcel?.longitude}`}
                      className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Delivery Address */}
            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`${parcel?.deliveryAddress}`}
                      className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full md:col-span-2 bg-[#9538E2]">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateMyParcel;
