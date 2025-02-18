import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import useLoadUser from "@/src/hooks/useLoadUser";
import { CameraIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MyProfile = () => {
  const [webUser, refetch] = useLoadUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const axiosSecure = useAxiosSecures();
  const imageBbApi = import.meta.env.VITE_IMAGEbb_API;
  const imageBbUrl = `https://api.imgbb.com/1/upload?key=${imageBbApi}`;

  const handleFileChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    if (!newProfilePic) return;
    try {
      const formData = new FormData();
      formData.append("image", newProfilePic);

      const res = await axiosSecure.post(imageBbUrl, formData);
      if (res.data.success) {
        const uploadedImageUrl = res.data.data.url;
        const resUpdate = await axiosSecure.put("/users-photourl", {
          email: webUser.email,
          photoURL: uploadedImageUrl,
        });

        if (resUpdate.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Photo updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <title>My Profile | Parcel Management</title>
      </Helmet>

      {/* Full-Width Section (Top) */}
      <div className="w-full bg-white shadow-lg rounded-xl p-6 mb-6">
        <CardHeader className="flex flex-col items-center">
          <div className="relative">
            <img
              src={webUser?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-1 right-1 bg-purple-600 text-white p-2 rounded-full shadow-md hover:bg-purple-700 transition"
            >
              <CameraIcon className="h-4 w-4" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">{webUser?.displayName}</h2>
          <p className="text-gray-500">{webUser?.email}</p>
        </CardHeader>
      </div>

      {/* Two Side-by-Side Sections (Below) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card */}
        <Card className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
          <CardContent>
            <div className="flex items-center gap-3 text-gray-700">
              <MailIcon className="h-5 w-5 text-gray-500" />
              <p className="text-md font-medium">{webUser?.email}</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700 mt-2">
              <PhoneIcon className="h-5 w-5 text-gray-500" />
              <p className="text-md font-medium">{webUser?.phone || "Not provided"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Right Card */}
        <Card className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Address</h3>
          <CardContent>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
              <p className="text-md font-medium">{webUser?.address || "Not provided"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Update Profile Picture Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-6">
          <DialogHeader className="text-xl font-semibold text-gray-700">Update Profile Picture</DialogHeader>
          <Input type="file" accept="image/*" onChange={handleFileChange} className="mt-4" />
          <DialogFooter className="flex justify-end gap-4 mt-4">
            <Button className="bg-green-500 text-white hover:bg-green-600" onClick={handleUpdateProfile}>
              Update
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProfile;
