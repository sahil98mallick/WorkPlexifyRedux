import React, { useEffect } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchalladminclients } from '../../../Redux/AdminPortal/AdminSlice'
import Swal from 'sweetalert2'
import { AxiosInstance } from '../../../APIManager/AxiosInstance'
import { SquareLoader } from 'react-spinners'

const AdminClients = () => {
    const { adminclients, adminusers, loading, } = useSelector((state) => state.admin)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchalladminclients())
    }, [dispatch])

    const deleteclientsrecord = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this users record!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const deletedata = await AxiosInstance.delete(`clients/deleteclient/${id}`);
                if (deletedata.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: deletedata.data.message,
                        text: deletedata.data.message,
                        timer: 1000,
                        showConfirmButton: false,
                    });
                    dispatch(fetchalladminclients())
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: deletedata.data.message,
                        text: deletedata.data.message,
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            }
        } catch (error) {
            // toast.error(error.message);
            Swal.fire({
                icon: 'error',
                title: error,
                timer: 2000,
                showConfirmButton: false,
            });
        } finally {
            dispatch(fetchalladminclients())
        }
    };

    const getownerName = (clientId) => {
        const client = adminusers.find((c) => c._id === clientId);
        return client ? client.name : 'Unknown Users';
    };
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">
                <div class="pagetitle">
                    <h1>Admin Dashboard</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/AdminDashboard'>Home</Link></li>
                            <li class="breadcrumb-item active">Admin Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <center>
                    <h2>All Register Clients Records</h2>
                </center>
                {
                    loading ? (
                        <>
                            <center>
                                <SquareLoader
                                    color="#36d7b7"
                                    size={150}
                                />
                            </center>
                        </>
                    ) : (
                        <>
                            {
                                adminclients?.length > 0 ? (
                                    <>
                                        <table class="restable">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Owner</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    adminclients?.map((item, key) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td data-label="S.No">{key + 1}</td>
                                                                    <td data-label="Image"><img src={item?.Image} alt="userimage" style={{ width: "50px", height: "50px" }} /></td>
                                                                    <td data-label="Name">{item?.name}</td>
                                                                    <td data-label="Name">{getownerName(item?.userID)}</td>
                                                                    <td data-label="Phone">{item?.phone}</td>
                                                                    <td data-label="Email">{item?.email}</td>
                                                                    <td data-label="Action">
                                                                        <button onClick={() => { deleteclientsrecord() }} className='btn btn-danger btn-sm'><i class="bi bi-trash3-fill"></i></button>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                ) : (
                                    <>
                                        <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>No Users Present In this System Added in your Accounts</h2>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </main>
        </>
    )
}

export default AdminClients