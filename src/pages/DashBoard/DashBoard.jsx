import { Button } from '@/src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';
import { Link, Outlet } from 'react-router-dom';
import logo from "../../assets/logo.png"
import { AuthContext } from '@/src/components/custom/ContextProvider';
import { useContext } from 'react';

import useAllMenuItems from '@/src/hooks/useAllMenuItems';
import { GlobeIcon } from '@/src/components/icons/Icon';
import { MenuIcon } from 'lucide-react';
import Loading from '@/src/components/custom/Loading/Loading';

const DashBoard = () => {
  const { isActive, setIsActive,loading } = useContext(AuthContext);
  
 
  const navItems=useAllMenuItems();
  console.log(navItems)
  

  const renderNav = () =>
    navItems?.map((menu) => (   
       
      <Link
    
        key={menu.id}
        onClick={() => setIsActive(menu.id)}
        to={menu.to}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${isActive === menu.id ? "bg-[#0B0B0B] text-white" : "text-white hover:bg-gray-200 hover:text-gray-900"}`}
      >
        {menu.icon}
        {menu.label}
      </Link>
    ));

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r bg-[#9538E2] text-white">
        <div className="sticky top-0 flex flex-col h-screen justify-between py-6 px-4">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 font-bold">
              <img className="w-16 h-16 rounded-full" src={logo} alt="Logo" />
              <span className="text-lg">Parcel Management</span>
            </Link>
            <nav className="space-y-1">{renderNav()}</nav>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GlobeIcon className="h-5 w-5" />
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-10 bg-[#9538E2] text-white px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold">
              <img className="w-16 h-16 rounded-full" src={logo} alt="Logo" />
              <span className="text-lg">Parcel Management</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6 text-gray-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#9538E2]">
                <div className="py-6 px-4 space-y-6">
                  <nav className="space-y-1">{renderNav()}</nav>
                  <div className="flex items-center gap-2 text-sm">
                    <GlobeIcon className="h-5 w-5" />
                    <span>English</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Outlet for rendering child routes */}
        <main className="p-4 lg:p-8">
           {loading ? <Loading></Loading> :  <Outlet />}
         
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
