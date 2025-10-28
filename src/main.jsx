import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./frontend/pages/Home";
import Login from "./frontend/pages/Login";
import Signup from "./frontend/pages/Signup";
import Dashboard from "./frontend/pages/Dashboard";
import Tickets from "./frontend/pages/Tickets";
import CreateTicket from "./frontend/pages/CreateTicket";
import EditTicket from "./frontend/pages/EditTicket";
import ProtectedRoute from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/", // Define the root path
    children: [
      {
        index: true,
        element: <Home />, // Render Homepage for the index route
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "tickets",
        element: <Tickets />,
      },
      {
        path: "tickets/new",
        element: <CreateTicket />,
      },
      {
        path: "tickets/:ticketId/edit",
        element: <EditTicket />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
