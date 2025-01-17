import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider,} from "react-router-dom";
import Routes from './routes/Routes/Routes';
import ContextProvider from './components/custom/ContextProvider';
import {  QueryClient,  QueryClientProvider,} from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={Routes} />
    </QueryClientProvider>      
    </ContextProvider>
  </StrictMode>,
)
