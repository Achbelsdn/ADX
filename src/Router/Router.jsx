import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",           // ✅ était "/ADX"
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },  // ✅ index au lieu de path: ""
        ],
    },
]);

export default router;
