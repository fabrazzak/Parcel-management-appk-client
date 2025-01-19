import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';


import { AuthContext } from '@/src/components/custom/ContextProvider.jsx';
import Loading from '@/src/components/custom/Loading/Loading';




const PrivateRoutes = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children
    }
    return <Navigate to="/login" state={location.pathname}></Navigate>

};

export default PrivateRoutes;