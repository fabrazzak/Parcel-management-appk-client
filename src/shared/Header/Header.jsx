import { Button } from "@/src/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

import logo from "../../assets/logo.png"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/src/components/custom/ContextProvider";
import { HomeIcon } from "lucide-react";
import { AiOutlineLogin } from "react-icons/ai"
import useLoadUser from "@/src/hooks/useLoadUser";


const Header = () => {

    const { user, signOutUser, isActive, setIsActive } = useContext(AuthContext)
    const navigate = useNavigate();
    const [webUser] = useLoadUser()




    const logOutHandle = async () => {
        try {
            await signOutUser();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);

        }
    };




    return (
        <header className="sticky top-0 z-50 w-full  bg-[#9538E2] text-white">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
                <Link href="#" className="flex items-center gap-2" >
                    <img src={logo} alt="Parcel-ManageMent-app" className="h-14 w-14 rounded-full" />
                    <span className="sr-only">Parcel-ManageMent-app</span>
                </Link>
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex">

                </nav>
                <div className="flex items-center gap-4">
                    <div className="hidden items-center gap-2 text-sm font-medium md:flex">
                    </div>
                    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                        <NavLink onClick={() => setIsActive("home")} to="/" className={`hover:text-[#0B0B0B] flex gap-1 font-bold  px-3 py-1 rounded-sm ${isActive == "home" && "bg-white text-[#0B0B0B]"} `} >
                            <HomeIcon className="h-5 w-5" />
                            Home
                        </NavLink>

                        {
                            user ? <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <div size="icon" className="rounded-full   flex items-center ">
                                        {webUser ? <img src={webUser?.photoURL} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full cursor-pointer" /> : <RxAvatar className="text-2xl cursor-pointer" />}

                                        <span className="sr-only">profile</span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[300px] p-4 mt-2">
                                    <DropdownMenuLabel>{webUser?.displayName}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <NavLink
                                            to={
                                                webUser?.role === "admin"
                                                    ? "/dashboard/statistics"
                                                    : webUser?.role === "delivery-man"
                                                        ? "/dashboard/my-delivery-list"
                                                        : "/dashboard/book-parcel"
                                            }
                                            onClick={() => setIsActive(webUser?.role === "admin" ? "statistics" : webUser?.role === "delivery-man" ? "my-delivery-list" : "book-parcel")}
                                            className={`font-bold py-1 rounded-sm ${isActive === "dashboard" ? "bg-[#0B0B0B] text-white ps-3" : "bg-white text-[#0B0B0B]"} w-full hover:bg-[#0B0B0B] hover:text-white hover:ps-3`}
                                        >
                                            Dashboard
                                        </NavLink>


                                    </DropdownMenuItem> <DropdownMenuItem>
                                        <NavLink onClick={() => { logOutHandle() }} className={`font-bold   py-1 rounded-sm bg-white  text-[#0B0B0B] w-full hover:bg-[#0B0B0B] hover:text-white hover:ps-3 `}> Logout</NavLink>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>

                            </DropdownMenu>
                                :

                                <NavLink to='/login' onClick={() => setIsActive("login")} className={`hover:text-[#0B0B0B] items-center content-center flex gap-1 font-bold  px-3 py-1 rounded-sm ${isActive == "login" && "bg-white text-[#0B0B0B]"} `}> <AiOutlineLogin className="text-xl font-bold" /> Login</NavLink>
                        }



                    </nav>

                    <NavLink onClick={() => setIsActive("notification")} className={`hover:text-[#0B0B0B] rounded-full p-1 font-bold text-2xl   ${isActive == "notification" && "bg-white text-[#0B0B0B]"} `}>

                        <IoMdNotificationsOutline className="text-2xl" />

                    </NavLink>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                                <MenuIcon className="h-5 w-5 text-white " />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="md:hidden">
                            <div className="grid gap-4 py-6">
                                <NavLink onClick={() => setIsActive("home")} to="/" className={`text-[#0B0B0B]  font-bold ps-3  py-1 rounded-sm ${isActive == "home" ? "bg-[#0B0B0B] text-white " : ""} `} >
                                    Home
                                </NavLink>
                                {
                                    user ? <DropdownMenu >
                                        <DropdownMenuTrigger asChild>
                                            <div size="icon" className="rounded-full   flex items-center ">
                                                {webUser ? <img src={webUser?.photoURL} className="w-10 h-10 rounded-full cursor-pointer" /> : <RxAvatar className="text-2xl cursor-pointer" />}
                                                <span className="sr-only">profile</span>
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[300px] p-4 mt-4">
                                            <DropdownMenuLabel>User Name</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <NavLink
                                                    to={
                                                        webUser?.role === "admin"
                                                            ? "/dashboard/all-parcels"
                                                            : webUser?.role === "delivery-man"
                                                                ? "/dashboard/my-delivery-list"
                                                                : "/dashboard/book-parcel"
                                                    }
                                                    onClick={() =>
                                                        setIsActive(
                                                            webUser?.role === "admin"
                                                                ? "all-parcels"
                                                                : webUser?.role === "delivery-man"
                                                                    ? "my-delivery-list"
                                                                    : "book-parcel"
                                                        )
                                                    }
                                                    className={`font-bold py-1 rounded-sm ${isActive === "dashboard" ? "bg-[#0B0B0B] text-white ps-3" : ""}`}
                                                >
                                                    Dashboard
                                                </NavLink>

                                            </DropdownMenuItem> <DropdownMenuItem>
                                                <NavLink onClick={() => { logOutHandle() }} className={`font-bold flex justify-start border-none  py-1 rounded-sm  bg-white text-[#0B0B0B] w-full ps-0   `}>Logout</NavLink>
                                            </DropdownMenuItem>

                                        </DropdownMenuContent>

                                    </DropdownMenu>
                                        :

                                        <NavLink to='/login' onClick={() => setIsActive("login")} className={`text-[#0B0B0B] font-bold  px-3 py-1 rounded-sm ${isActive == "login" && "bg-[#0B0B0B] text-white"} `}>Login</NavLink>
                                }
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

function MenuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function MoonIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    )
}


function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}


function PhoneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}


function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}



export default Header