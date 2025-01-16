import { Button } from '@/src/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import Lottie from 'lottie-react';
import loginLottie from "../../assets/lottiFile/login.json";
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/src/components/ui/card';
import { AuthContext } from '@/src/components/custom/ContextProvider';
import { useContext } from 'react';
import { Separator } from '@/src/components/ui/separator';
import { FaGoogle } from "react-icons/fa";
import useAxiosSecures from '@/src/hooks/useAxiosSecures';
import Swal from 'sweetalert2';

const Login = () => {
    const form = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const axiosSecure = useAxiosSecures();

    const handleSubmit = async (data) => {
        const { email, password } = data;
        try {
            const userCredential = await loginUser(email, password);
            const user = userCredential.user;
            form.reset({               
                email: "",
                password: "",
              });
               Swal.fire({ title: "Account Login Successfully", icon: "success", draggable: true ,timer: 1500});
            navigate(location?.state || "/");
        } catch (error) {
            console.error(error);
            alert('Email or Password invalid');
        }
    };

  const handleGoogleLogin = async () => {
    try {
        const userCredential = await loginWithGoogle();
        const result = userCredential?.user;  
        if(result){
            console.log(result);          
           
            const userInfo={
                 displayName: result.displayName,
                 photoURL: result.photoURL,
                 email: result.email,
                 role:"user"
             }
             Swal.fire({ title: "Account Login Successfully", icon: "success", draggable: true ,timer: 1500});

             location?.state ? navigate(location?.state) : navigate("/");    
             await axiosSecure.post('/users', {...userInfo });
        }    
    
    } catch (error) {
        console.error(error);
    }
};

    return (
        <div className="relative">
            <div className="grid h-screen w-full grid-cols-1 lg:grid-cols-2">
                {/* Lottie Animation */}
                <div className="hidden h-screen bg-gray-100 dark:bg-gray-800 lg:block">
                    <Lottie className="h-screen" animationData={loginLottie} />
                </div>

                {/* Login Form */}
                <div className="flex items-center justify-center p-6 lg:p-10">
                    <Card className="mx-auto w-full max-w-[500px] px-6 py-12 space-y-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold">Welcome back!</h1>
                            <p className="text-gray-500 dark:text-gray-400">Enter your email and password to sign in.</p>
                        </div>

                        <Form {...form}>
                            <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Type your email" {...field} />
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
                                                <Input type="password" placeholder="Type your password" {...field} />
                                            </FormControl>
                                            <FormLabel>
                                                If you don&apos;t have an account, <Link to="/sign-up" className="text-[#9538E2]">Register here</Link>
                                            </FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button type="submit" className="w-full bg-[#9538E2]">
                                    Login account
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

export default Login;
