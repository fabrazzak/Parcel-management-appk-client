import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider,} from "react-router-dom";
import Routes from './routes/Routes/Routes';
import ContextProvider from './components/custom/ContextProvider';
import {  QueryClient,  QueryClientProvider,} from '@tanstack/react-query'
import 'leaflet/dist/leaflet.css';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={Routes} />
    </QueryClientProvider> 
    </HelmetProvider>         
    </ContextProvider>
  </StrictMode>,
)
