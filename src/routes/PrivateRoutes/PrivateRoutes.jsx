import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';


import { AuthContext } from '@/src/components/custom/ContextProvider.jsx';
import Loading from '@/src/components/custom/Loading/Loading';
import useLoadUser from '@/src/hooks/useLoadUser';




const PrivateRoutes = ({ children }) => {
    const [webUser]=useLoadUser()
    const location = useLocation()
    const { loading,user } = useContext(AuthContext)
    if (loading) {
        return <Loading></Loading>
    }

    if (webUser && user) {
        return children
    }
    return <Navigate to="/login" state={location.pathname}></Navigate>

};

export default PrivateRoutes;