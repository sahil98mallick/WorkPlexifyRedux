import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { useAuth } from '../../AuthManager/AuthManager'
import { useDispatch, useSelector } from 'react-redux'
import { fetchalluserwriters } from '../../../Redux/WriterSlice/WriterSlice'
import { useForm } from 'react-hook-form'
import { AxiosInstance } from '../../../APIManager/AxiosInstance'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { BeatLoader, SquareLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

const Writers = () => {
    const [saveload, setsaveload] = useState(false)
    const [auth,] = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredwriter, setfilteredwriters] = useState([]);
    const dispatch = useDispatch()
    const { writers, loading } = useSelector((state) => state.writer)

    useEffect(() => {
        if (auth?.user?._id) {
            dispatch(fetchalluserwriters(auth?.user?._id))
        }
    }, [dispatch, auth?.user?._id])

    useEffect(() => {
        // Filter Income based on searchTerm
        const filteredData = writers?.filter(item =>
            item?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            item?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
        );
        setfilteredwriters(filteredData);
    }, [searchTerm, writers]);


    // Add writer Details
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const onSubmit = async (data) => {
        // console.log(data);
        setsaveload(true)
        data.activestatus = "true"
        data.userID = auth?.user?._id
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('email', data.email);
            formData.append('activestatus', data.activestatus);
            formData.append('userID', data.userID);
            formData.append('Image', data.Image[0]);
            const response = await AxiosInstance.post("writers/addwriters", formData)
            const clinetdata = response?.data
            if (clinetdata) {
                //toast.success(clinetdata.message)
                Swal.fire({
                    icon: 'success',
                    title: clinetdata?.message,
                    text: clinetdata?.message,
                    timer: 2000,
                    showConfirmButton: false,
                })
                dispatch(fetchalluserwriters(auth?.user?._id))
                setValue("name", "");
                setValue("phone", "");
                setValue("email", "");
                setValue("Image", "");
            } else {
                toast.error(clinetdata.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setsaveload(false)
        }
    }

    // Delete Writer Records
    const deletewriterrecord = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this writer!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const deletedata = await AxiosInstance.delete(`writers/deletewriter/${id}`);
                if (deletedata.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: deletedata?.data?.message,
                        text: deletedata?.data?.message,
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    dispatch(fetchalluserwriters(auth?.user?._id))
                } else {
                    toast.error(deletedata.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            dispatch(fetchalluserwriters(auth?.user?._id))
        }
    };
    // Pagination Code
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredwriter.slice(indexOfFirstItem, indexOfLastItem);
    const totalPageCount = Math.ceil(filteredwriter.length / itemsPerPage);
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPageCount) {
            setCurrentPage(pageNumber);
        }
    };
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">
                <div class="pagetitle">
                    <h1>Writers</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
                            <li class="breadcrumb-item active">Writers</li>
                        </ol>
                    </nav>
                </div>
                {/* Main Section */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Add Writer Details</h5>
                                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                        <div className="col-12">
                                            <label htmlFor="inputNanme4" className="form-label">Writer Name</label>
                                            <input type="text" className="form-control" id="inputNanme4" {...register("name", { required: true })} />
                                        </div>
                                        {errors.name?.type === "required" && <p>Name is Required</p>}
                                        <div className="col-12">
                                            <label htmlFor="inputNanme4" className="form-label">Mobile Number</label>
                                            <input type="number" className="form-control" id="inputNanme4"
                                                {...register("phone", { required: true })} />
                                        </div>
                                        {errors.phone?.type === "required" && <p>Phone is Required</p>}
                                        <div className="col-12">
                                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="inputEmail4" {...register("email", { required: true })} />
                                        </div>
                                        {errors.email?.type === "required" && <p>Email is Required</p>}
                                        <div className="col-12">
                                            <label htmlFor="inputAddress" className="form-label">Profile Image</label>
                                            <input type="file" className="form-control" id="inputAddress"
                                                {...register("Image", { required: true })} accept="image/*" />
                                        </div>
                                        {errors.Image?.type === "required" && <p>Image is Required</p>}
                                        <div className="text-center">
                                            {saveload ? (
                                                <><button type="submit" className="btn btn-secondary  rounded-pill" disabled>
                                                    <BeatLoader
                                                        color="#0d1be9"
                                                        size={10}
                                                    /></button></>
                                            ) : (
                                                <><button type="submit" className="btn btn-primary  rounded-pill">Submit</button></>
                                            )}&nbsp;
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">All Writers Details</h5>
                                    <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "15px" }}>
                                        <input type="text" className='form-control' placeholder='Search Here' onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ width: "300px" }} />
                                    </div>
                                    {
                                        loading ? (
                                            <><center>
                                                <SquareLoader
                                                    color="#36d7b7"
                                                    size={150}
                                                />
                                            </center></>
                                        ) : (
                                            <>
                                                {
                                                    writers?.length > 0 ? (
                                                        <>
                                                            <table class="restable">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Image</th>
                                                                        <th>Name</th>
                                                                        <th>Email</th>
                                                                        <th>Phone</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        currentItems?.map((item, key) => {
                                                                            return (
                                                                                <>
                                                                                    <tr>
                                                                                        <td data-label="Image">
                                                                                            <img src={item?.Image} alt="WriterImage" style={{ width: "30px", height: "30px" }} />
                                                                                        </td>
                                                                                        <td data-label="Name">{item?.name}</td>
                                                                                        <td data-label="Email">{item?.email}</td>
                                                                                        <td data-label="Phone">{item?.phone}</td>
                                                                                        <td data-label="Action">
                                                                                            <button className='btn btn-success btn-sm'><i class="bi bi-pencil"></i></button>&nbsp;
                                                                                            <button onClick={() => { deletewriterrecord(item?._id) }} className='btn btn-danger btn-sm'><i class="bi bi-trash3-fill"></i></button>
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                            <br />
                                                            <div id='paginationdesign'>
                                                                <nav aria-label="Page navigation example">
                                                                    <ul className="pagination">
                                                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                                            <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>
                                                                                <span aria-hidden="true">&laquo;</span>
                                                                            </a>
                                                                        </li>
                                                                        {Array.from({ length: totalPageCount }, (_, index) => (
                                                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                                                <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                                                                                    {index + 1}
                                                                                </a>
                                                                            </li>
                                                                        ))}
                                                                        <li className={`page-item ${currentPage === totalPageCount ? 'disabled' : ''}`}>
                                                                            <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>
                                                                                <span aria-hidden="true">&raquo;</span>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </nav>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>No Writers Added in your Accounts</h2>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </main>
        </>
    )
}

export default Writers