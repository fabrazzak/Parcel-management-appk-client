

import useLoadUser from '@/src/hooks/useLoadUser';
import AdminDashBoard from '../Admin/AdminDashboard/AdminDashboard';
import DeliveryMenDashboard from '../DeliveryMen/DeliveryMenDashboard/DeliveryMenDashboard';
import UserDashboard from '../Users/UserDashboard/UserDashboard';

const DashBoard = () => {
    const [webUser]=useLoadUser()

    return (
        <div>
            {
                webUser?.role == "admin" ? <AdminDashBoard></AdminDashBoard> :
                webUser?.role =="delivery-man" ?<DeliveryMenDashboard></DeliveryMenDashboard>  :
                <UserDashboard></UserDashboard> 
            }
             
           
               
        </div>
    );
};

export default DashBoard;