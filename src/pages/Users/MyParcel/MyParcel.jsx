import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/src/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/src/components/ui/alert-dialog";
import useBookParcel from "@/src/hooks/useBookParcel";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import { Link } from "react-router-dom";
import Loading from "@/src/components/custom/Loading/Loading";

const MyParcel = () => {
  const { myParcels, refetch,isLoading,isPending }=useBookParcel()
  const [parcels, setParcels] = useState([...myParcels]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [dropdowns, setDropdowns] = useState({});

  const axiosSecure=useAxiosSecures()

  useEffect(() => {     
    setParcels([...myParcels]);
   
  }, [myParcels]);
  

  const handleCancel = (parcelId) => {
    setShowAlert(true);
    setSelectedParcel(parcelId);
    closeDropdown(parcelId);
  };

  const handleConfirmCancel = async () => {

    await axiosSecure.put("book-parcel",{id:selectedParcel,bookingStatus:"canceled"})  

  
    refetch()
    setShowAlert(false);
  };

  const handleReview = (parcelId) => {
    console.log(`Review parcel with ID: ${parcelId}`);
    closeDropdown(parcelId);
  };

  const handleFilterChange = (status) => {
    setFilteredStatus(status);
  };

  const toggleDropdown = (parcelId) => {
    setDropdowns((prev) => ({
      ...prev,
      [parcelId]: !prev[parcelId],
    }));
  };

  const closeDropdown = (parcelId) => {
    setDropdowns((prev) => ({
      ...prev,
      [parcelId]: false,
    }));
  };

  const filteredParcels = parcels.filter((parcel) =>
    filteredStatus === "all" || parcel.status === filteredStatus
  );
 
 
  if(isPending){   
    return <Loading></Loading>
  }
 
  return (
    <div>
       

            <div className="container mx-auto p-8 rounded-lg shadow-lg bg-white">
      <h1 className="text-4xl font-semibold mb-6 text-[#9538E2]">My Parcels</h1>

      <Select value={filteredStatus?.toUpperCase()} onValueChange={handleFilterChange} className="mb-4 capitalize w-full max-w-xs border-2 border-[#9538E2] rounded-md shadow-md">
        <SelectTrigger className="bg-transparent text-[#9538E2] text-lg font-medium px-4 py-2 rounded-md focus:ring-2 focus:ring-[#9538E2]">
          {filteredStatus === "all" ? "All Statuses" : filteredStatus}
        </SelectTrigger>
        <SelectContent className="bg-white border-2 border-[#9538E2] rounded-md max-w-[200px]">
          <SelectItem value="all" className="p-2 hover:bg-gray-200">All</SelectItem>
          <SelectItem value="pending" className="p-2 hover:bg-gray-200">Pending</SelectItem>
          <SelectItem value="on the way" className="p-2 hover:bg-gray-200">On the way</SelectItem>
          <SelectItem value="delivered" className="p-2 hover:bg-gray-200">Delivered</SelectItem>
          <SelectItem value="canceled" className="p-2 hover:bg-gray-200">Canceled</SelectItem>
        </SelectContent>
      </Select>

      <table className="min-w-full border-collapse table-auto text-[#0B0B0B]">
        <thead>
          <tr className="bg-[#9538E2] text-white">
            <th className="border p-3 text-left">Parcel Type</th>
            <th className="border p-3 text-left">Requested Delivery Date</th>
            <th className="border p-3 text-left">Approximate Delivery Date</th>
            <th className="border p-3 text-left">Booking Date</th>
            <th className="border p-3 text-left">Delivery Men ID</th>
            <th className="border p-3 text-left">Booking Status</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        {
            parcels?.length == 0  ? <p className="text-center w-full flex  py-10 justify-center text-2xl font-bold"> Not Available</p> :

        <tbody>
          {filteredParcels.map((parcel) => (
            <tr key={parcel.id} className="hover:bg-[#f3f3f3]">
              <td className="border p-3">{parcel.parcelType}</td>
              <td className="border p-3">{parcel.deliveryDate?.slice(0,10)}</td>
              <td className="border p-3">{parcel.deliveryDate?.slice(0,10)}</td>
              <td className="border p-3">{parcel.bookingDate?.toLocaleString()?.slice(0,10)}</td>
              <td className="border p-3">{parcel.deliveryMenId || "Not Assigned"}</td>
              <td className={`border p-3 capitalize font-semibold ${parcel.status =="canceled" ? "text-red-500": parcel.status =="pending"? "text-blue-600" : "text-[#9538E2]"}`}>{parcel?.status}</td>
              <td className="border p-3 flex items-center space-x-3">
                <div className="relative">
                  <Button
                    onClick={() => toggleDropdown(parcel._id)}
                    className="bg-[#6D28D9] text-white px-4 py-2 rounded-md hover:bg-[#9538E2] transition-colors duration-200"
                  >
                    Actions
                  </Button>
                  {dropdowns[parcel._id] && (
                    <div className="absolute bg-white border rounded-md shadow-lg w-40 mt-2 z-10 p-4 right-0 bottom-10 space-y-2">
                      <Link to={`/dashboard/my-parcels/${parcel._id}`}>
                      <Button
                        disabled={parcel.status !== "pending"}                        
                        className="w-full text-left px-4 py-2 text-white  bg-blue-500 hover:bg-blue-600"
                      >
                        Update
                      </Button>
                      </Link>
                      <Button
                        disabled={parcel.status !== "pending"}
                        onClick={() => handleCancel(parcel._id)}
                        className="w-full text-left px-4 py-2 text-white  bg-red-500 hover:bg-red-600"
                      >
                        Cancel
                      </Button>
                      {parcel.status === "delivered" && (
                        <Button
                          onClick={() => handleReview(parcel._id)}
                          className="w-full text-left px-4 py-2 text-gray-700  bg-yellow-500 hover:bg-yellow-600"
                        >
                          Review
                        </Button>
                      )}
                      {parcel.status === "delivered" && (
                        <Button
                          className="w-full text-left px-4 py-2 text-gray-700  bg-green-500 hover:bg-green-600"
                        >
                          Pay
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
          }
      </table>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white p-6 rounded-lg shadow-xl">
          <AlertDialogTitle>Are you sure you want to cancel this booking?</AlertDialogTitle>
          <AlertDialogDescription>
            Once canceled, you won't be able to modify this booking.
          </AlertDialogDescription>
          <AlertDialogAction onClick={handleConfirmCancel} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Yes, Cancel</AlertDialogAction>
          <AlertDialogCancel className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">No, Keep It</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
      
    </div>
  );
};

export default MyParcel;
