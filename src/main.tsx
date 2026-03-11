import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, RouterProvider} from "react-router";
import router from "./router.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterProvider router={router} />,
    </BrowserRouter>,
  </StrictMode>,
)
