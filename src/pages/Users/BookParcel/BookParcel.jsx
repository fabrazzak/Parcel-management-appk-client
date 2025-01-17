import { useState, useContext } from "react";
import { AuthContext } from "@/src/components/custom/ContextProvider";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { Form } from "react-router-dom";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";

const BookParcel = () => {
  const { user } = useContext(AuthContext); // Get logged-in user data
  const form = useForm(); // Initialize react-hook-form
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="max-w-4xl w-full p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-8">
          Book a Parcel
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        value={user?.name || ""}
                        {...field}
                        readOnly
                        disabled
                        className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        value={user?.email || ""}
                        {...field}
                        readOnly
                        disabled
                        className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                      />
                    </FormControl>
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
                        type="tel"
                        placeholder="Enter receiver's phone number"
                        className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Parcel Delivery Address */}
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

              {/* Requested Delivery Date */}
              <FormField
                control={form.control}
                name="deliveryDate"
                render={() => (
                  <FormItem>
                    <FormLabel>Requested Delivery Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={deliveryDate}
                        onChange={(date) => setDeliveryDate(date)}
                        dateFormat="MMMM d, yyyy"
                        className="w-full p-4 mt-2 rounded-lg bg-gray-100 text-gray-800 shadow-md"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full p-4 mt-8 rounded-lg bg-purple-600 text-white text-xl font-bold hover:bg-purple-700"
            >
              Book Parcel
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookParcel;
