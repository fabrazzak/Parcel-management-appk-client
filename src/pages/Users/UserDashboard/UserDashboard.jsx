import { Button } from '@/src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';

import { Link, Outlet } from 'react-router-dom';
import logo from "../../../assets/logo.png"
import { AuthContext } from '@/src/components/custom/ContextProvider';
import { useContext } from 'react';
import { BookParcelIcon, GlobeIcon, HomeIcon, MenuIcon, UsersIcon } from '@/src/components/icons/Icon';

const UserDashboard = () => {
     const {user,signOutUser,isActive,setIsActive}= useContext(AuthContext)
    return (
        <div className="flex h-screen w-full">
      <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r bg-[#9538E2] text-white">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6">
            <Link href="#" className="flex items-center gap-2 font-bold" prefetch={false}>
            <img className='w-16 h-16 rounded-full' src={logo} />
              <span className="text-lg">Parcel Management </span>
            </Link>
            <nav className="space-y-1">
              <Link onClick={() => setIsActive("home")}
                to="/"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900   "
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <Link onClick={() => setIsActive("book-parcel")}
                to="book-parcel"
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900  ${isActive == "book-parcel" ? "bg-[#0B0B0B] text-white " :""}`}
                prefetch={false}
              >
                <BookParcelIcon className="h-5 w-5" />
               Book Parcel
              </Link>
              <Link  onClick={() => setIsActive("my-parcels")}
                to="my-parcels"
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 ${isActive == "my-parcels" ? "bg-[#0B0B0B] text-white " :""}`}
                prefetch={false}
              >
                <ParcelIcon className="h-5 w-5" />
              My Parcels
              </Link>
              <Link  onClick={() => setIsActive("my-profile")}
                to="my-profile"
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 ${isActive == "my-profile" ? "bg-[#0B0B0B] text-white " :""}`}
                prefetch={false}
              >
                <UsersIcon className="h-5 w-5" />
              My Profile
              </Link>
             
            </nav>
          </div>
          <div className="space-y-4">
           
            <div className="flex items-center gap-2 text-sm text-white dark:text-gray-400">
              <GlobeIcon className="h-5 w-5" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b  px-4 py-3 bg-[#9538E2]  text-white  lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="#" className="flex items-center gap-2 font-bold" prefetch={false}>
            <img className='w-16 h-16 rounded-full' src={logo} />
            <span className="text-lg">Parcel Management </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-8 w-8 text-gray-900 hover:text-[#9538E2]" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#9538E2] text-white">
                <div className="flex h-full flex-col justify-between py-6 px-4">
                  <div className="space-y-6">
                    <nav className="space-y-1">
                      <Link
                        href="#"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium    text-white hover:bg-[#0B0B0B] hover:text-white   "
                        prefetch={false}
                      >
                        <HomeIcon className="h-5 w-5" />
                        Home
                      </Link>
                      <Link  onClick={() => setIsActive("book-parcel")}
                        to="book-parcel"
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium    text-white hover:bg-[#0B0B0B] hover:text-white ${isActive == "book-parcel" ? "bg-[#0B0B0B] text-white " :""} `}
                        prefetch={false}
                      >
                      
                        <BookParcelIcon className="h-5 w-5"></BookParcelIcon>
                        Book Parcel
                      </Link>
                      <Link  onClick={() => setIsActive("my-parcels")}
                       to="my-parcels"
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium    text-white hover:bg-[#0B0B0B] hover:text-white ${isActive == "my-parcels" ? "bg-[#0B0B0B] text-white " :""} `}
                        prefetch={false}
                      >
                        
                        <ParcelIcon className="h-5 w-5" ></ParcelIcon>
                        My Parcel
                      </Link>
                      <Link  onClick={() => setIsActive("my-profile")}
                       to="my-profile"
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium    text-white hover:bg-[#0B0B0B] hover:text-white ${isActive == "my-profile" ? "bg-[#0B0B0B] text-white " :""} `}
                        prefetch={false}
                      >
                        <UsersIcon className="h-5 w-5" />
                        My Profile
                      </Link>
                    </nav>
                  </div>
                  <div className="space-y-4">                    
                    <div className="flex items-center gap-2 text-sm text-white ">
                      <GlobeIcon className="h-5 w-5" />
                      <span>English</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="p-4 lg:p-8">
         <Outlet></Outlet>
        </main>
      </div>
    </div>
    );
};



 export function ParcelIcon(props) {
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
        <rect x="2" y="7" width="20" height="13" rx="2" ry="2" />
        <path d="M16 2l4 5H4l4-5h8z" />
        <path d="M12 12v8" />
        <path d="M7 12h10" />
      </svg>
    );
  }
  
  
  
  
export default UserDashboard;