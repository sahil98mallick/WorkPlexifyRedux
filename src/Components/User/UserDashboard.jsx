import React, { useEffect, useState } from 'react'
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../AuthManager/AuthManager';
import { fetchclienttotalamountjobs, fetchcurrentmonthamounts, fetchongingjobs, fetchprojectdetails, totaljobamounts } from '../../Redux/TaskSlice/TaskSlice';
import { fetchalluserclients } from '../../Redux/ClientSlice/ClientSlice';

const UserDashboard = () => {
    const [auth,] = useAuth();
    const [loadmore, setloadmore] = useState(5)
    const [ongoingload, setongoingload] = useState(5)
    const dispatch = useDispatch()
    const { projects, totalamounts, totalJobAmount, loading, ongingjobs, completedjobs, presentmonthincomes } = useSelector((state) => state.task)
    const { clients } = useSelector((state) => state.client)

    useEffect(() => {
        if (auth?.user?._id) {
            dispatch(fetchclienttotalamountjobs(auth?.user?._id))
            dispatch(fetchalluserclients(auth?.user?._id))
            dispatch(totaljobamounts(auth?.user?._id))
            dispatch(fetchprojectdetails(auth?.user?._id))
            dispatch(fetchongingjobs(auth?.user?._id));
            dispatch(fetchcurrentmonthamounts(auth?.user?._id));
        }
    }, [dispatch, auth?.user?._id])

    // Fetch the Client Name here
    const getClientName = (clientId) => {
        const client = clients.find((c) => c._id === clientId);
        return client ? client.name : 'Unknown Client';
    };

    useEffect(() => {
        const drawBarChart = () => {
            const ctx = document.querySelector('#barChart');

            if (!ctx) {
                console.error('Canvas element not found');
                return;
            }
            if (presentmonthincomes.length === 0) {
                // console.log('Total amounts data is not available yet. Skipping chart rendering.');
                return;
            }
            // Extract client names and total amounts from the Redux state
            const clientNamespresent = presentmonthincomes.map(item => getClientName(item._id));
            const presenttotalAmountsData = presentmonthincomes.map(item => item.totalIncome);
            // Calcuate the Current Month Here
            const currentDate = new Date();
            // Array of month names
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const currentMonthIndex = currentDate.getMonth();
            const currentMonthName = monthNames[currentMonthIndex];
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'bar',
                data: {
                    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'July'],
                    labels: clientNamespresent,
                    datasets: [{
                        label: `'Bar Chart of Present Clients Sales  ${currentMonthName}`,
                        // data: [65, 59, 80, 81, 56, 55, 40, 5, 45],
                        data: presenttotalAmountsData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        };

        drawBarChart();
        return () => {
        };
    }, [presentmonthincomes, getClientName]);

    useEffect(() => {
        const drawBarChart = () => {
            const ctx = document.querySelector('#overallbarChart');

            if (!ctx) {
                console.error('Canvas element not found');
                return;
            }
            if (totalamounts.length === 0) {
                console.log('Total amounts data is not available yet. Skipping chart rendering.');
                return;
            }
            // Extract client names and total amounts from the Redux state
            const clientNames = totalamounts.map(item => getClientName(item._id));
            const totalAmountsData = totalamounts.map(item => item.totalAmount);
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'bar',
                data: {
                    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'July'],
                    labels: clientNames,
                    datasets: [{
                        label: 'Bar Chart of OverAll Clients Sales',
                        // data: [65, 59, 80, 81, 56, 55, 40, 5, 45],
                        data: totalAmountsData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        };

        drawBarChart();
        return () => {
        };
    }, [totalamounts, getClientName]);


    // Calcuate the Current Month Here
    const currentDate = new Date();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
    const currentYear = currentDate.getFullYear();

    const morecompleted = async () => {
        setloadmore(loadmore + 2)
    }
    const moreongoing = async () => {
        setongoingload(loadmore + 2)
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <main id="main" class="main">
                <div class="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="card-body">
                                            <h5 className="card-title">Clients <span>| Total</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{clients?.length}</h6>
                                                    <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">
                                        <div className="card-body">
                                            <h5 className="card-title">Revenue <span>| Overall</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-currency-dollar" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>₹{totalJobAmount}</h6>
                                                    <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-12">
                                    <div className="card info-card customers-card">
                                        <div className="card-body">
                                            <h5 className="card-title">Tasks <span>| Total</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people" />
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{projects?.length}</h6>
                                                    <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Bar Chart of {currentMonthName}, {currentYear} Month Clients Sales</h5>
                                        {/* Bar Chart */}
                                        <canvas id="barChart" style={{ maxHeight: '400px' }}></canvas>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Bar Chart of OverAll Clients Sales -Year({currentYear})</h5>
                                        {/* Bar Chart */}
                                        <canvas id="overallbarChart" style={{ maxHeight: '400px' }}></canvas>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Recent Projects <span>| Active ({ongingjobs?.length})</span></h5>
                                    <div className="activity">
                                        {
                                            ongingjobs?.slice(0, ongoingload).map((item, key) => {
                                                return (
                                                    <>
                                                        <div className="activity-item d-flex">
                                                            <div className="activite-label">
                                                                <i style={{ color: "black" }}></i>
                                                                <b>{item?.enddate?.slice(0, 10)}</b></div>&nbsp;
                                                            <i className="bi bi-circle-fill activity-badge text-warning align-self-start" />&nbsp;
                                                            <div className="activity-content" id='activitycontents'>
                                                                {item?.jobid} <sup style={{ color: "green" }}>Ongoing</sup>
                                                                <br />
                                                                <Link to={`/ViewSingleTaskDetails/${item?._id}`} className="fw-bold text-primary">&nbsp;View <i class="bi bi-arrow-bar-right"></i></Link>
                                                            </div>
                                                        </div>

                                                    </>
                                                )
                                            })
                                        }
                                        <center>
                                            {ongoingload < ongingjobs?.length && <button onClick={moreongoing} className='btn btn-light'><i class="bi bi-arrow-repeat"></i></button>}
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Completd Projects <span>| Completed ({completedjobs?.length})</span></h5>
                                    <div className="activity">
                                        {
                                            completedjobs?.slice(0, loadmore)?.map((item, key) => {
                                                return (
                                                    <>
                                                        <div className="activity-item d-flex" key={key + 1}>
                                                            <div className="activite-label">
                                                                <i style={{ color: "black" }}></i>
                                                                <b>{item?.enddate?.slice(0, 10)}</b></div>&nbsp;
                                                            <i className="bi bi-circle-fill activity-badge text-danger align-self-start" />&nbsp;
                                                            <div className="activity-content" id='activitycontents'>
                                                                {item?.jobid?.slice(0, 20)} <sup style={{ color: "red" }}>Completed</sup>
                                                                <br />
                                                                <Link to={`/ViewSingleTaskDetails/${item?._id}`} className="fw-bold text-primary">&nbsp;View <i class="bi bi-arrow-bar-right"></i></Link>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                        <center>
                                            {loadmore < completedjobs?.length && <button onClick={morecompleted} className='btn btn-light'><i class="bi bi-arrow-repeat"></i></button>}
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default UserDashboard