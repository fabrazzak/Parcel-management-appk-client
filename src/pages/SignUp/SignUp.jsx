import { Button } from '@/src/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import Lottie from 'lottie-react';
import loginLottie from "../../assets/lottiFile/signup.json";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/src/components/ui/card';
import { useContext } from 'react';
import { AuthContext } from '@/src/components/custom/ContextProvider';
import Swal from 'sweetalert2';
import useAxiosSecures from '@/src/hooks/useAxiosSecures';
import { FaGoogle } from 'react-icons/fa';
import { Separator } from '@/src/components/ui/separator';
import useLoadUser from '@/src/hooks/useLoadUser';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
  const { createUser, profileUpdate, loginWithGoogle } = useContext(AuthContext);
  const form = useForm();
  const axiosSecure = useAxiosSecures();
  const location = useLocation();
  const navigate = useNavigate();
  const [webUser, refetch] = useLoadUser()

  const handleRegister = async (data) => {
    const { name, photoUrl, email, password, phoneNumber } = data;
    const userInfo = { displayName: name, photoURL: photoUrl, role: "user", phoneNumber };

    try {
      const userCredential = await createUser(email, password);
      const result = userCredential.user;
      if (result) {



        await axiosSecure.post('/users', { ...userInfo, email });
        Swal.fire({ title: "Account Created Successfully", icon: "success", draggable: true, timer: 1500 });
        profileUpdate(userInfo)
          .then(() => console.log("hello"))
          .catch((error) => {
            console.log(error)
            // ...
          });
        form.reset({
          name: "",
          photoUrl: "",
          email: "",
          password: "",
        });

        refetch()
        location?.state ? navigate(location?.state) : navigate("/");

      }


    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: error?.message });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await loginWithGoogle();
      const result = userCredential?.user;
      if (result) {
        console.log(result);

        const userInfo = {
          displayName: result.displayName,
          photoURL: result.photoURL,
          email: result.email,
          role: "user"
        }
        Swal.fire({ title: "Account Login Successfully", icon: "success", draggable: true, timer: 1500 });

        location?.state ? navigate(location?.state) : navigate("/");
        await axiosSecure.post('/users', { ...userInfo });
        refetch()
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <Helmet>
        <title> Sign Up || Parcel Management </title>

      </Helmet>
      <div className="grid h-screen w-full grid-cols-1 lg:grid-cols-2">
        {/* Lottie Animation */}
        <div className="hidden h-screen bg-gray-100 dark:bg-gray-800 lg:block">
          <Lottie className="h-screen" animationData={loginLottie} />
        </div>

        {/* Sign Up Form */}
        <div className="flex items-center justify-center p-6 lg:p-6">
          <Card className="mx-auto w-full max-w-[500px] px-6 py-6 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome </h1>
              <p className="text-gray-500 dark:text-gray-400">Enter your information to sign up.</p>
            </div>

            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(handleRegister)}>
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" required placeholder="Type your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl>
                        <Input type="text" required placeholder="Type your Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Photo URL Field */}
                <FormField
                  control={form.control}
                  name="photoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl>
                        <Input type="text" required placeholder="Type your Photo URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> {/* Phone Number Field */}



                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" required placeholder="Type your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" required placeholder="Type your Password" {...field} />
                      </FormControl>
                      <FormLabel>
                        Already have an account? <Link to="/login" className="text-[#9538E2]">Login here</Link>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-[#9538E2]">
                  Create Account
                </Button>
              </form>
            </Form>
            <Separator />
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-[#9538E2] text-white hover:bg-gray-900 hover:text-white"
              variant="outline"
            >
              Login with <FaGoogle className="text-[#FBBC05] ml-2" />oogle
            </Button>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default SignUp;
