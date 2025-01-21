import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import useLoadUser from "@/src/hooks/useLoadUser";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MyProfile = () => {
  const [webUser, refetch] = useLoadUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null); // To store the selected profile picture
  const imageBbApi = import.meta.env.VITE_IMAGEbb_API;
  const imageBbUrl = `https://api.imgbb.com/1/upload?key=${imageBbApi}`;
  const axiosSecure = useAxiosSecures();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (newProfilePic) {
      try {
        const formData = new FormData();
        formData.append("image", newProfilePic); // 'image' is the expected key for ImgBB API

        const res = await axiosSecure.post(imageBbUrl, formData);

        if (res.data && res.data.success) {
          const uploadedImageUrl = res.data.data.url;
          const resUpdate = await axiosSecure.put('/users-photourl', { email: webUser.email, photoURL: uploadedImageUrl })

          if (resUpdate.status == 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Photo update done",
              showConfirmButton: false,
              timer: 1500
            });
            refetch()

          }

          setIsModalOpen(false);
        } else {
          console.error("ImgBB upload failed:", res.data);
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-8 bg-white rounded-2xl shadow-2xl">
        <Helmet>
          <title> My Profile|| Parcel Management </title>

        </Helmet>
        <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-8">
          My Profile
        </h1>
        <div className="container mx-auto max-w-xl p-6">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <img
              src={webUser?.photoURL || "/default-avatar.png"} // Use default avatar if no photoURL
              alt="Profile Picture"
              className="w-32 h-32 mb-4 rounded-full"
            />
            {/* Name and Email */}
            <div className="text-center space-y-2 mb-6">
              <p className="text-lg font-medium">Name: {webUser.displayName}</p>
              <p className="text-lg font-medium">Email: {webUser.email}</p>
            </div>

            {/* Update Profile Picture Button */}
            <Button
              variant="default"
              className="bg-blue-500 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Update Profile Picture
            </Button>
          </div>

          {/* Shadcn Modal for Profile Picture Update */}
          <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
            <DialogTrigger asChild>
              {/* This can be triggered by a button, but it's not needed as the dialog is controlled */}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Update Profile Picture</DialogHeader>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-4"
              />
              <DialogFooter>
                <Button
                  variant="default"
                  className="bg-green-500 text-white"
                  onClick={handleUpdateProfile}
                >
                  Update
                </Button>
                <Button
                  variant="ghost"
                  className="ml-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
