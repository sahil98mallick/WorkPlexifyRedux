import React, { useEffect } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../AuthManager/AuthManager'
import { fetchongingjobs, fetchprojectdetails } from '../../../Redux/TaskSlice/TaskSlice'
import { fetchalluserclients } from '../../../Redux/ClientSlice/ClientSlice'
import { fetchalluserwriters } from '../../../Redux/WriterSlice/WriterSlice'
import { SquareLoader } from 'react-spinners'

const PendingTaskdetails = () => {
    const [auth,] = useAuth();
    const dispatch = useDispatch()
    const { ongingjobs, loading } = useSelector((state) => state.task)
    const { clients } = useSelector((state) => state.client);
    const { writers } = useSelector((state) => state.writer)

    useEffect(() => {
        if (auth?.user?._id) {
            dispatch(fetchongingjobs(auth?.user?._id));
            dispatch(fetchalluserclients(auth?.user?._id))
            dispatch(fetchalluserwriters(auth?.user?._id))
        }
    }, [dispatch, auth?.user?._id])

    // console.log("Projects", projects);

    // Fetch the Client Name here
    const getClientName = (clientId) => {
        const client = clients.find((c) => c._id === clientId);
        return client ? client.name : 'Unknown Client';
    };
    const getWriterName = (userId) => {
        const writerData = writers.find((user) => user._id === userId);
        return writerData ? writerData.name : 'Unknown Writer';
    };
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">
                <div class="pagetitle">
                    <h1>Pending Projects</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
                            <li class="breadcrumb-item active">Pending Projects</li>
                        </ol>
                    </nav>
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
                                ongingjobs?.length > 0 ? (
                                    <>
                                        <table class="restable">
                                            <thead>
                                                <tr>
                                                    <th>Job ID</th>
                                                    <th>Client Name</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Writer Name</th>
                                                    <th>Job Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ongingjobs?.map((item, key) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td data-label="Job ID"><Link to={`/ViewSingleTaskDetails/${item?._id}`}>{item?.jobid?.slice(0, 20)}..</Link></td>
                                                                    <td data-label="Client Name">{getClientName(item.clientname)}</td>
                                                                    <td data-label="Start Date">{item.startdate?.slice(0, 10)}</td>
                                                                    <td data-label="End Date">{item.enddate?.slice(0, 10)}</td>
                                                                    <td data-label="Writer Name">{getWriterName(item.writername)}</td>
                                                                    <td data-label="Job Status">
                                                                        <span
                                                                            style={{
                                                                                color: item?.jobstatus ? 'green' : 'red',
                                                                                fontWeight: 'bold',
                                                                            }}
                                                                        >
                                                                            {item?.jobstatus ? "Onging" : "Completed"}
                                                                        </span>
                                                                    </td>
                                                                    <td data-label="Action">
                                                                        <div>
                                                                            <Link to={`/ViewSingleTaskDetails/${item?._id}`} className='btn btn-primary btn-sm'><i class="bi bi-eye-fill"></i></Link >&nbsp;
                                                                        </div>
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
                                        <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>No Pending Project Present in your Accounts</h2>
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

export default PendingTaskdetails