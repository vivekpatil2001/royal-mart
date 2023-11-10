import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignUp from './views/SignUp/SignUp';
 import Login from './views/Login/Login'
 import Home from './views/Home/Home';
 

import { createBrowserRouter,RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>

  },
  {
    path:'/signup',
    element:<SignUp/>
    
  },
  {
    path:'/login',
    element:<Login/>

  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <>
 <RouterProvider router={router}/>
 </>
);


