import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthManager/AuthManager';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcompletedjobs } from '../../Redux/TaskSlice/TaskSlice';
import { fetchalluserclients } from '../../Redux/ClientSlice/ClientSlice';
import { fetchalluserwriters } from '../../Redux/WriterSlice/WriterSlice';
import { fetchinvoicedetails } from '../../Redux/InvoiceSlice/InvoiceSlice';
import { WorkingProgess } from '../CustomFunction/CustomFunctions';

const Sidebar = () => {
    const [auth, setauth] = useAuth();
    const navigate = useNavigate();

    // Logout Function
    const logoutfunction = () => {
        toast.warn("Logout Successfully...")
        setauth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem("authenticate");
        navigate("/")
    }

    // Counts
    const dispatch = useDispatch()
    const { ongingjobs, projects, completedjobs, loading } = useSelector((state) => state.task)
    const { clients } = useSelector((state) => state.client);
    const { invoices } = useSelector((state) => state.invoice)
    const { writers } = useSelector((state) => state.writer)

    useEffect(() => {
        if (auth?.user?._id) {
            dispatch(fetchcompletedjobs(auth?.user?._id));
            dispatch(fetchalluserclients(auth?.user?._id))
            dispatch(fetchalluserwriters(auth?.user?._id))
            dispatch(fetchinvoicedetails(auth?.user?._id));
        }
    }, [dispatch, auth?.user?._id])

    return (
        <>
            {/* ======= Sidebar ======= */}
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        {
                            auth?.user?.userType === "Admin" ? (
                                <><Link to='/AdminDashboard' className="nav-link">
                                    <i className="bi bi-grid" />
                                    <span>Dashboard</span>
                                </Link></>
                            ) : (
                                <>
                                    <Link to='/UserDashboard' className="nav-link">
                                        <i className="bi bi-grid" />
                                        <span>Dashboard</span>
                                    </Link>
                                </>
                            )
                        }
                    </li>{/* End Dashboard Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-buildings-fill"></i><span>Organizations</span><i className="bi bi-chevron-down ms-auto" />
                        </a>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                {
                                    auth?.user?.userType === "Admin" ? (
                                        <> <Link to='/Adminusers'>
                                            <i className="bi bi-person" /><span>Users</span>
                                        </Link></>
                                    ) : null
                                }
                            </li>
                            <li>
                                {
                                    auth?.user?.userType === "Admin" ? (
                                        <>
                                            <Link to='/AdminClients'>
                                                <i className="bi bi-person" /><span>Clients</span>
                                            </Link>
                                        </>
                                    ) : (
                                        <> <Link to='/ClientDetails'>
                                            <i className="bi bi-person" /><span>Clients ({clients?.length})</span>
                                        </Link></>
                                    )
                                }
                            </li>
                            <li>
                                {
                                    auth?.user?.userType === "Admin" ? (
                                        <> <Link to='/Adminusers'>
                                            <i className="bi bi-person" /><span>Writers</span>
                                        </Link></>
                                    ) : (
                                        <> <Link to='/Writers'>
                                            <i className="bi bi-person" /><span>Writers ({writers?.length})</span>
                                        </Link></>
                                    )
                                }
                            </li>
                        </ul>
                    </li>{/* End Components Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-journal-text" /><span>Projects</span><i className="bi bi-chevron-down ms-auto" />
                        </a>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to='/AddTaskDetails' >
                                    <i className="bi bi-arrow-right-circle" /><span>Add Projects</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/ViewTaskDetails'>
                                    <i className="bi bi-arrow-right-circle" /><span>All Projects ({projects?.length})</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/PendingTaskdetails'>
                                    <i className="bi bi-arrow-right-circle" /><span>Pending Projects ({ongingjobs?.length})</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/CompletedTaskdetails'>
                                    <i className="bi bi-arrow-right-circle" /><span>Completed Projects ({completedjobs?.length})</span>
                                </Link>
                            </li>
                        </ul>
                    </li>{/* End Forms Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i className="bi bi-layout-text-window-reverse" /><span>Invoices</span><i className="bi bi-chevron-down ms-auto" />
                        </a>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to='/CreateInvoice'>
                                    <i className="bi bi-circle" /><span>Create Invoices</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/ViewInvoice'>
                                    <i className="bi bi-circle" /><span>All Invoices ({invoices?.length})</span>
                                </Link>
                            </li>
                            <li>
                                <a onClick={() => { WorkingProgess() }}>
                                    <i className="bi bi-circle" /><span>Old Invoices</span>
                                </a>
                            </li>
                        </ul>
                    </li>{/* End Tables Nav */}
                    <li className="nav-heading">Pages</li>
                    <li className="nav-item">
                        <Link to='/Profile' className="nav-link collapsed">
                            <i className="bi bi-person" />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li onClick={() => { WorkingProgess() }} className="nav-item">
                        <a className="nav-link collapsed">
                            <i class="bi bi-envelope-paper-fill"></i>
                            <span>Notice Board</span>
                        </a>
                    </li>
                    {/* End Profile Page Nav */}
                    <li className="nav-item">
                        <a onClick={() => { WorkingProgess() }} className="nav-link collapsed">
                            <i class="bi bi-key-fill"></i>
                            <span>Password Manager</span>
                        </a>
                    </li>
                    {/* End F.A.Q Page Nav */}
                    <li className="nav-item">
                        <a onClick={() => { logoutfunction() }} className="nav-link collapsed">
                            <i className="bi bi-box-arrow-in-right" />
                            <span>Logout</span>
                        </a>
                    </li>
                    {/* End Login Page Nav */}
                </ul>
            </aside>

        </>
    )
}

export default Sidebar