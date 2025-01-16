
import AdminDashBoard from '../Admin/AdminDashboard/AdminDashboard';
import DeliveryMenDashboard from '../DeliveryMen/DeliveryMenDashboard/DeliveryMenDashboard';
import UserDashboard from '../Users/UserDashboard/UserDashboard';

const DashBoard = () => {
    return (
        <div>
            <AdminDashBoard></AdminDashBoard>
            <DeliveryMenDashboard></DeliveryMenDashboard>
            <UserDashboard></UserDashboard>
            
        </div>
    );
};

export default DashBoard;