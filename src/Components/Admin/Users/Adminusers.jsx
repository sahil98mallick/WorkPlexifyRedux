import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchalladminusers } from '../../../Redux/AdminPortal/AdminSlice'
import Swal from 'sweetalert2'
import { AxiosInstance } from '../../../APIManager/AxiosInstance'
import { SquareLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const Adminusers = () => {
    const [saveload, setsaveload] = useState(false)
    const { adminusers, loading, } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchalladminusers())
    }, [dispatch])

    const deleteusersrecord = async (id) => {
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
                const deletedata = await AxiosInstance.delete(`users/deleteuser/${id}`);
                if (deletedata?.data?.success) {
                    Swal.fire({
                        icon: 'success',
                        title: deletedata.data.message,
                        text: deletedata.data.message,
                        timer: 1000,
                        showConfirmButton: false,
                    });
                    dispatch(fetchalladminusers())
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
            dispatch(fetchalladminusers())
        }
    };

    // Function to update users active status
    const handleStatusChange = async (userid, newStatus) => {
        setsaveload(true)
        try {
            const data = { activestatus: newStatus };

            const response = await AxiosInstance.put(`users/updateuseractivestatus/${userid}`, data);
            if (response.status === 200) {
                toast.success(response.data.message)
                const updatedtask = adminusers.map(item => {
                    if (item._id === userid) {
                        return { ...item, activestatus: newStatus };
                    }
                    return item;
                });
                dispatch(fetchalladminusers(updatedtask))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setsaveload(false)
        }
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
                    <h2>All Register Users Records</h2>
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
                                adminusers?.length > 0 ? (
                                    <>
                                        <table class="restable">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    <th>Active Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    adminusers?.map((item, key) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td data-label="S.No">{key + 1}</td>
                                                                    <td data-label="Image"><img src={item?.Image} alt="userimage" style={{ width: "50px", height: "50px" }} /></td>
                                                                    <td data-label="Name">{item?.name}</td>
                                                                    <td data-label="Phone">{item?.phone}</td>
                                                                    <td data-label="Email">{item?.email}</td>
                                                                    <td data-label="Active Status" style={{
                                                                        color: item.activestatus ? 'green' : 'red',
                                                                        fontWeight: 'bold',
                                                                    }}>{item.activestatus ? "Active" : "In-Active"}</td>
                                                                    <td data-label="Action">
                                                                        <button onClick={() => handleStatusChange(item?._id, !item?.activestatus)} className='btn btn-info' style={{
                                                                            background: item?.activestatus ? 'brown' : 'green',
                                                                            color: "white", fontFamily: "Times", border: "0px solid white"
                                                                        }}>
                                                                            {item?.activestatus ? "In-Active" : "Active"}
                                                                        </button>

                                                                        &nbsp;
                                                                        <button onClick={() => { deleteusersrecord(item?._id) }} className='btn btn-danger btn-sm'><i class="bi bi-trash3-fill"></i> Delete</button>
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

export default Adminusers