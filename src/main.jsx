import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App';
import Update from './Update';


const router = createBrowserRouter([
  {
    path: "/",
    element:<App></App>
  },
  {
    path: "/update/:id",
    element:<Update></Update>,
    loader:({params})=>fetch(`http://localhost:2000/user/${params.id}`)
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
