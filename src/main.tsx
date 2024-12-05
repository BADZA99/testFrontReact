
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";


import TransactionsPage from "./pages/Transactions.tsx";
import App from "./App.tsx";
import ChartPage from "./pages/ChartPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/charts",
        element: <ChartPage />,
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
