import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignUp from './views/SignUp/SignUp';

import { createBrowserRouter,RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',
    element:<SignUp/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <>
 <RouterProvider router={router}/>
 </>
);


