import { Button } from '@/src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';

import { data, Link, Outlet } from 'react-router-dom';
import logo from "../../../assets/logo.png"
import { AuthContext } from '@/src/components/custom/ContextProvider';
import { useContext } from 'react';
import { DeliveryListIcon, GlobeIcon, HomeIcon, MenuIcon, ReviewIcon } from '@/src/components/icons/Icon';

const DeliveryMenDashboard = () => {
  const { user, signOutUser, isActive, setIsActive } = useContext(AuthContext)
  return (
    <div className="flex h-screen w-full">
      <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-[#9538E2] text-white">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6">
            <Link href="#" className="flex items-center gap-2 font-bold" prefetch={false}>
              <img className='w-16 h-16 rounded-full' src={logo} />
              <span className="text-lg">Parcel Management </span>
            </Link>
            <nav className="space-y-1">
              <Link onClick={() => setIsActive("home")}
                to="/"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 "
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <Link onClick={() => setIsActive("my-delivery-list")}
                to="my-delivery-list"
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 ${isActive == "my-delivery-list" ? "bg-[#0B0B0B] text-white " : ""}`}
                prefetch={false}
              >
                <DeliveryListIcon className="h-5 w-5" />
                My Delivery List
              </Link>
              <Link onClick={() => setIsActive("my-reviews")}
                to="my-reviews"
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 ${isActive == "my-reviews" ? "bg-[#0B0B0B] text-white " : ""}`}
                prefetch={false}
              >
                <ReviewIcon className="h-5 w-5" />
                My Reviews
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
        <header className="sticky top-0 z-10 border-b bg-[#9538E2] text-white px-4 py-3   lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="#" className="flex items-center gap-2 font-bold" prefetch={false}>
              <img className='w-16 h-16 rounded-full' src={logo} />
              <span className="text-lg">Parcel Management </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6  text-gray-900" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#9538E2] text-white">
                <div className="flex h-full flex-col justify-between py-6 px-4">
                  <div className="space-y-6">
                    <nav className="space-y-1">
                      <Link onClick={() => setIsActive("home")}
                        to="/"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 "
                        prefetch={false}
                      >
                        <HomeIcon className="h-5 w-5" />
                        Home
                      </Link>
                      <Link onClick={() => setIsActive("my-delivery-list")}
                        to="my-delivery-list"
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 ${isActive == "my-delivery-list" ? "bg-[#0B0B0B] text-white " : ""}`}
                        prefetch={false}
                      >
                        <DeliveryListIcon className="h-5 w-5" />
                        My Delivery List
                      </Link>
                      <Link onClick={() => setIsActive("my-reviews")}
                        to="my-reviews"
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 ${isActive == "my-reviews" ? "bg-[#0B0B0B] text-white " : ""}`}
                        prefetch={false}
                      >
                        <ReviewIcon className="h-5 w-5" />
                        My Reviews
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

export default DeliveryMenDashboard;