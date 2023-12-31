import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { useForm } from 'react-hook-form';
import { BeatLoader, SquareLoader } from 'react-spinners';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchalluserclients } from '../../../Redux/ClientSlice/ClientSlice';
import { fetchalluserwriters } from '../../../Redux/WriterSlice/WriterSlice';
import { useAuth } from '../../AuthManager/AuthManager';
import { fetchpsinglerojectdetails } from '../../../Redux/TaskSlice/TaskSlice';
import { AxiosInstance } from '../../../APIManager/AxiosInstance';
import { toast } from 'react-toastify';

const UpdateTaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [auth,] = useAuth();
    const [saveload, setsaveload] = useState(false)
    const dispatch = useDispatch()
    const { clients } = useSelector((state) => state.client);
    const { writers } = useSelector((state) => state.writer);
    const { singleprojects, loading } = useSelector((state) => state.task);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        const fetchData = async () => {
            if (id && auth?.user?._id) {
                dispatch(fetchalluserclients(auth?.user?._id));
                dispatch(fetchalluserwriters(auth?.user?._id));
                dispatch(fetchpsinglerojectdetails(id));
            }
        };
        fetchData();
    }, [dispatch, auth?.user?._id, id]);

    useEffect(() => {
        if (singleprojects) {
            setValue('jobid', singleprojects.jobid);
            setValue('startdate', formatDate(singleprojects.startdate));
            setValue('enddate', formatDate(singleprojects.enddate));
            setValue('clientname', singleprojects.clientname);
            setValue('actualprice', singleprojects.actualprice);
            setValue('writername', singleprojects.writername);
            setValue('writeprice', singleprojects.writeprice);
            setValue('jobdetails', singleprojects.jobdetails);
        }
    }, [singleprojects, setValue]);



    const onSubmit = async (data) => {
        data.userID = auth?.user?._id
        data.jobstatus = singleprojects.jobstatus
        // console.log(data);
        try {
            const response = await AxiosInstance.put(`jobdetails/updatejob/${id}`, data);
            if (response?.data) {
                toast.success(response?.data?.message)
                navigate("/ViewTaskDetails")

            } else {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">
                <div class="pagetitle">
                    <h1>Projects</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
                            <li class="breadcrumb-item active">Projects</li>
                        </ol>
                    </nav>
                </div>

                {/* Main Contents */}
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="card">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="">
                                                <div className="card-body">
                                                    <h5 className="card-title">Project Details</h5>
                                                    {/* Vertical Form */}
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label htmlFor="inputNanme4" className="form-label">Project ID</label>
                                                            <input type="text" className="form-control"
                                                                {...register("jobid", { required: true })} />
                                                        </div>
                                                        {errors.jobid?.type === "required" && <p>Job Id is Required</p>}
                                                        <div className="col-12">
                                                            <label htmlFor="inputEmail4" className="form-label">Project Start Date</label>
                                                            <input type="date" className="form-control" {...register("startdate", { required: true })} />
                                                        </div>
                                                        {errors.startdate?.type === "required" && <p>Select Start Date</p>}
                                                        <div className="col-12">
                                                            <label htmlFor="inputPassword4" className="form-label">Project End Date</label>
                                                            <input type="date" className="form-control" {...register("enddate", { required: true })} />
                                                        </div>
                                                        {errors.enddate?.type === "required" && <p>Select End Date</p>}
                                                        <div className="col-12">
                                                            <label htmlFor="inputAddress" className="form-label">Select Client Name</label>
                                                            <select class="form-select" aria-label="Default select example" {...register("clientname", { required: true })}>
                                                                <option selected>Open this select menu</option>
                                                                {
                                                                    clients?.map((item, key) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item?._id}>{item?.name}</option>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        {errors.clientname?.type === "required" && <p>Client Name is Required</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="">
                                                <div className="card-body">
                                                    <h5 className="card-title">Project Price Details</h5>
                                                    {/* Project Price Form */}
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label htmlFor="inputNanme4" className="form-label">Total Price</label>
                                                            <input type="number" className="form-control" {...register("actualprice", { required: true })} />
                                                        </div>
                                                        {errors.actualprice?.type === "required" && <p>Total price is Required</p>}
                                                        <div className="col-12">
                                                            <label htmlFor="inputEmail4" className="form-label">Select Writer Name</label>
                                                            <select class="form-select" aria-label="Default select example" {...register("writername", { required: true })}>
                                                                <option selected>Open this select menu</option>
                                                                {
                                                                    writers?.map((item, key) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item?._id}>{item?.name}</option>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        {errors.writername?.type === "required" && <p>Writer Name is Required</p>}
                                                        <div className="col-12">
                                                            <label htmlFor="inputPassword4" className="form-label">Writer Price</label>
                                                            <input type="number" className="form-control" {...register("writeprice", { required: true })} />
                                                        </div>
                                                        {errors.writeprice?.type === "required" && <p>Writer Price is Required</p>}
                                                        <div className="col-12">
                                                            <label htmlFor="inputAddress" className="form-label">Job Details</label>
                                                            <textarea class="form-control" style={{ height: "100px" }} {...register("jobdetails", { required: true })} />
                                                        </div>
                                                        {errors.jobdetails?.type === "required" && <p>Job Details is Required</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <center>
                                        <div className="col-12">
                                            {saveload ? (
                                                <><button type="submit" className="btn btn-secondary  rounded-pill" disabled>
                                                    <BeatLoader
                                                        color="#0d1be9"
                                                        size={10}
                                                    /></button></>
                                            ) : (
                                                <><button type="submit" className="btn btn-primary  rounded-pill">Submit</button></>
                                            )}&nbsp;
                                            <button type="reset" class="btn btn-secondary rounded-pill">Reset</button>
                                        </div>
                                    </center>
                                    <br />
                                </div>
                            </form>
                        </>
                    )
                }
            </main>
        </>
    )
}

export default UpdateTaskDetails