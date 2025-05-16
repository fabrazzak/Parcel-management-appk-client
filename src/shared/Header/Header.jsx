import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { HomeIcon, Sun, Moon } from "lucide-react";
import { AiOutlineLogin } from "react-icons/ai";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { AuthContext } from "@/src/components/custom/ContextProvider";
import useLoadUser from "@/src/hooks/useLoadUser";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";

import logo from "../../assets/logo.png";
import useTheme from "@/src/hooks/useTheme";

const Header = () => {
    const { user, signOutUser, isActive, setIsActive } = useContext(AuthContext);
    const { toggleDarkMode, darkMode } = useTheme();
    const navigate = useNavigate();
    const [webUser] = useLoadUser();
    const axiosInstance = useAxiosSecures(navigate);


    const logOutHandle = async () => {
        try {
            await signOutUser();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-[#9538E2] text-white dark:bg-[#0B0B0B]">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Parcel-ManageMent-app" className="h-14 w-14 rounded-full" />
                    <span className="sr-only">Parcel-ManageMent-app</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <NavLink to="/" onClick={() => setIsActive("home")} className={`flex gap-1 font-bold px-3 py-1 rounded-sm ${isActive === "home" ? "bg-white text-[#0B0B0B]" : "text-white dark:text-gray-300 hover:text-[#0B0B0B] dark:hover:text-white"}`}>
                        <HomeIcon className="h-5 w-5" />
                        Home
                    </NavLink>
                    <NavLink
                        to={webUser?.role === "admin" ? "/dashboard/statistics" : webUser?.role === "delivery-man" ? "/dashboard/my-delivery-list" : "/dashboard/book-parcel"}
                        className="block py-1 rounded-sm text-white dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 px-4"
                    >
                        Dashboard
                    </NavLink>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="rounded-full flex items-center cursor-pointer">
                                    {webUser?.photoURL ? (
                                        <img src={webUser.photoURL} className="w-10 h-10 rounded-full" alt="User" />
                                    ) : (
                                        <RxAvatar className="text-2xl" />
                                    )}
                                    <span className="sr-only">Profile</span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 p-4 mt-2 bg-white dark:bg-gray-800">
                                <DropdownMenuLabel>{webUser?.displayName}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <NavLink
                                        to={webUser?.role === "admin" ? "/dashboard/statistics" : webUser?.role === "delivery-man" ? "/dashboard/my-delivery-list" : "/dashboard/book-parcel"}
                                        className="block py-1 rounded-sm text-[#0B0B0B] dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 px-4"
                                    >
                                        Dashboard
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <button onClick={logOutHandle} className="block w-full text-left py-1 rounded-sm bg-red-500 text-white hover:bg-red-600 px-4">
                                        Logout
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <NavLink to="/login" onClick={() => setIsActive("login")} className={`flex gap-1 font-bold px-3 py-1 rounded-sm ${isActive === "login" ? "bg-white text-[#0B0B0B]" : "text-white dark:text-gray-300 hover:text-[#0B0B0B] dark:hover:text-white"}`}>
                            <AiOutlineLogin className="text-xl font-bold" />
                            Login
                        </NavLink>

                    )}
                     {/* Dark Mode Toggle */}
                <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700">
                    {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
                </button>

                {/* Notification Icon */}
                <NavLink onClick={() => setIsActive("notification")} className={`rounded-full p-1 text-2xl ${isActive === "notification" ? "bg-white text-[#0B0B0B]" : "text-white dark:text-gray-300 hover:text-[#0B0B0B] dark:hover:text-white"}`}>
                    <IoMdNotificationsOutline />
                </NavLink>
                </nav>

               

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                            <MenuIcon className="h-5 w-5 text-white dark:text-gray-300" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="md:hidden bg-white dark:bg-gray-900">
                        <div className="grid gap-4 py-6">
                            <NavLink to="/" onClick={() => setIsActive("home")} className={`text-[#0B0B0B] dark:text-white font-bold px-3 py-1 rounded-sm ${isActive === "home" && "bg-[#0B0B0B] text-white dark:bg-gray-700"}`}>
                                Home
                            </NavLink>
                            {user && (
                                <NavLink to="/dashboard" className="text-[#0B0B0B] dark:text-white font-bold px-3 py-1 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-700">
                                    Dashboard
                                </NavLink>
                            )}
                            {!user && (
                                <NavLink to="/login" onClick={() => setIsActive("login")} className="text-[#0B0B0B] dark:text-white font-bold px-3 py-1 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-700">
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

// Mobile Menu Icon
function MenuIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
}

export default Header;
