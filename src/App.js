import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import UserDashboard from './Components/User/UserDashboard';
import ClientDetails from './Components/User/ClientsPages/ClientDetails';
import Writers from './Components/User/WriterPages/Writers';
import ViewTaskDetails from './Components/User/UserTaskManager/ViewTaskDetails';
import AddTaskDetails from './Components/User/UserTaskManager/AddTaskDetails';
import ViewInvoice from './Components/User/InvoicePages/ViewInvoice';
import CreateInvoice from './Components/User/InvoicePages/CreateInvoice';
import Profile from './Components/User/ProfileManager/Profile';
import Login from './Components/AuthPages/Login';
import Register from './Components/AuthPages/Register';
import ResetPassword from './Components/AuthPages/ResetPassword';
import PrintInvoiceDetails from './Components/User/InvoicePages/PrintInvoiceDetails';
import UpdateProfile from './Components/User/ProfileManager/UpdateProfile';
import ViewSingleTaskDetails from './Components/User/UserTaskManager/ViewSingleTaskDetails';
import PendingTaskdetails from './Components/User/UserTaskManager/PendingTaskdetails';
import CompletedTaskdetails from './Components/User/UserTaskManager/CompletedTaskdetails';
import { useAuth } from './Components/AuthManager/AuthManager';
import EmptyPage from './Components/User/EmptyPage/EmptyPage';
import SearchJobDetails from './Components/User/SearchJobDetails/SearchJobDetails';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminClients from './Components/Admin/Clients/AdminClients';
import Adminusers from './Components/Admin/Users/Adminusers';
import UpdateTaskDetails from './Components/User/UserTaskManager/UpdateTaskDetails';

function App() {
  const [auth] = useAuth();

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("authenticate") || sessionStorage.getItem("authenticate");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/" />
    );
  }
  const PublicRoute = [
    {
      path: "/",
      components: auth?.token ? <Navigate to="/profile" /> : <Login />
    },
    {
      path: "/Register",
      components: auth?.token ? <Navigate to="/profile" /> : <Register />
    },
    {
      path: "/ResetPassword",
      components: auth?.token ? <Navigate to="/profile" /> : <ResetPassword />
    }
  ]

  const ProtectedRoute = [
    {
      path: "/UserDashboard",
      components: <UserDashboard />
    },
    {
      path: "/ClientDetails",
      components: <ClientDetails />
    },
    {
      path: "/Writers",
      components: <Writers />
    },
    {
      path: "/AddTaskDetails",
      components: <AddTaskDetails />
    },
    {
      path: "/ViewTaskDetails",
      components: <ViewTaskDetails />
    },
    {
      path: "/UpdateTaskDetails/:id",
      components: <UpdateTaskDetails />
    },
    {
      path: "/CompletedTaskdetails",
      components: <CompletedTaskdetails />
    },
    {
      path: "/PendingTaskdetails",
      components: <PendingTaskdetails />
    },
    {
      path: "/ViewSingleTaskDetails/:id",
      components: <ViewSingleTaskDetails />
    },
    {
      path: "/Profile",
      components: <Profile />
    },
    {
      path: "/UpdateProfile",
      components: <UpdateProfile />
    },
    {
      path: "/CreateInvoice",
      components: <CreateInvoice />
    },
    {
      path: "/ViewInvoice",
      components: <ViewInvoice />
    },
    {
      path: "/PrintInvoiceDetails/:id",
      components: <PrintInvoiceDetails />
    },
    {
      path: "/searchdetails/:searchQuery",
      components: <SearchJobDetails />
    },
    // Admin
    {
      path: "/AdminDashboard",
      components: <AdminDashboard />
    },
    {
      path: "/AdminClients",
      components: <AdminClients />
    },
    {
      path: "/Adminusers",
      components: <Adminusers />
    },
    {
      path: "*",
      components: <EmptyPage />
    },
  ]
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Routes>
          {/* Public Route */}
          {
            PublicRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={item.components} />
                </>
              )
            })
          }
          {/* Private Route */}
          {
            ProtectedRoute?.map((item, key) => {
              return (
                <>
                  <Route
                    key={key + 1}
                    path={item.path}
                    element={<PrivateRoute>{item.components}</PrivateRoute>} />
                </>
              )
            })
          }
          {/* <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/ResetPassword' element={<ResetPassword />} />
          <Route path='/UserDashboard' element={<UserDashboard />} />
          <Route path='/ClientDetails' element={<ClientDetails />} />
          <Route path='/Writers' element={<Writers />} />
          <Route path='/AddTaskDetails' element={<AddTaskDetails />} />
          <Route path='/ViewSingleTaskDetails/:id' element={<ViewSingleTaskDetails />} />
          <Route path='/ViewTaskDetails' element={<ViewTaskDetails />} />
          <Route path='/PendingTaskdetails' element={<PendingTaskdetails />} />
          <Route path='/CompletedTaskdetails' element={<CompletedTaskdetails />} />
          <Route path='/CreateInvoice' element={<CreateInvoice />} />
          <Route path='/ViewInvoice' element={<ViewInvoice />} />
          <Route path='/PrintInvoiceDetails/:id' element={<PrintInvoiceDetails />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/UpdateProfile' element={<UpdateProfile />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
