import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {

  RouterProvider,
} from "react-router-dom";
import Routes from './routes/Routes/Routes';
import ContextProvider from './components/custom/ContextProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <RouterProvider router={Routes} /> 
    </ContextProvider>      
  </StrictMode>,
)
