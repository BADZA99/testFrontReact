
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home.tsx";
import TransactionsPage from "./pages/Transactions.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

       children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  
    <>
      <RouterProvider router={router} />
    </>

);
