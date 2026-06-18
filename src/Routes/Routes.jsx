import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Coverage from "../Pages/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ForgetPass from "../Pages/ForgetPass";
import SendParcel from "../Pages/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Dashboard-Pages/Dashboard";
import Payment from "../Pages/Payment";
import SuccessPage from "../Pages/SuccessPage";
import PaymentHistory from "../Dashboard-Pages/PaymentHistory";
import Rider from "../Pages/Rider";
import ApproveRiders from "../Dashboard-Pages/ApproveRiders";
import ManageUsers from "../Dashboard-Pages/ManageUsers";
import AdminRoute from "./AdminRoute";
import Forbidden from "../Error-Pages/Forbidden";
import AsignRiders from "../Dashboard-Pages/AsignRiders";
import AssignedWork from "../Dashboard-Pages/AssignedWork"
import CompletedTasks from "../Dashboard-Pages/CompletedTasks";
import Tracking from "../Dashboard-Pages/Tracking";
import Details from "../Pages/Details";
import MyParcels from "../Dashboard-Pages/MyParcels";
import UserRoute from "./UserRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children:[
            {
                index: true,
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/coverage',
                element: <Coverage></Coverage>
            },
            {
                path: '/sendparcel',
                element: <PrivateRoute>
                    <UserRoute>
                        <SendParcel></SendParcel>
                    </UserRoute>
                </PrivateRoute>
            },
            {
                path: '/rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>
            },
        ]
    },
    {
        path: '/',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children:[
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },       
            {
                path: '/myparcels',
                element: <UserRoute>
                    <MyParcels></MyParcels>
                </UserRoute>
            },      
            {
                path: '/myparcels/sendparcel',
                element: <UserRoute>
                    <SendParcel></SendParcel>
                </UserRoute>
            },
            {
                path: '/payment/:id',
                element: <UserRoute>
                    <Payment></Payment>
                </UserRoute>
            },
            {
                path: '/success-page',
                element: <SuccessPage></SuccessPage>
            },
            {
                path: '/paymentHistory',
                element: <UserRoute>
                    <PaymentHistory></PaymentHistory>
                </UserRoute>
            },
            {
                path: '/approveRiders',
                element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
            },
            {
                path: '/manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: '/assignRiders',
                element: <AdminRoute><AsignRiders></AsignRiders></AdminRoute>
            },
            {
                path: '/assignedWorks',
                element: <AssignedWork></AssignedWork>
            },
            {
                path: '/completedTasks',
                element: <CompletedTasks></CompletedTasks>
            },
            {
                path: '/tracking/:trackingId',
                element: <Tracking></Tracking>
            },
            {
                path: '/parcelDetails/:id',
                element: <UserRoute>
                    <Details></Details>
                </UserRoute>
            },
            {
                path: '/coverageArea',
                element: <Coverage></Coverage>
            },
            {
                path: '/forbidden',
                element: <Forbidden></Forbidden>
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/login',
                element: <PublicRoute><Login></Login></PublicRoute>
            },
            {
                path: '/signup',
                element: <PublicRoute><SignUp></SignUp></PublicRoute>
            },
            {
                path: '/forgetpass',
                element: <ForgetPass></ForgetPass>
            }
        ]
    }
])