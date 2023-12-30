import React, { useEffect } from 'react'
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'
import { Chart } from 'chart.js';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    useEffect(() => {
        const drawBarChart = () => {
            const ctx = document.querySelector('#barChart');

            if (!ctx) {
                console.error('Canvas element not found');
                return;
            }
            // if (totalamounts.length === 0) {
            //     console.log('Total amounts data is not available yet. Skipping chart rendering.');
            //     return;
            // }
            // // Extract client names and total amounts from the Redux state
            // const clientNames = totalamounts.map(item => getClientName(item._id));
            // const totalAmountsData = totalamounts.map(item => item.totalAmount);
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'July'],
                    // labels: clientNames,
                    datasets: [{
                        label: 'Bar Chart of OverAll Clients Sales',
                        data: [65, 59, 80, 81, 56, 55, 40, 5, 45],
                        // data: totalAmountsData,
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
    }, []);
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
                <section className="section dashboard">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card sales-card">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Clients <span>| Total</span></h5>
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-people" />
                                            </div>
                                            <div className="ps-3">
                                                <h6>2563</h6>
                                                <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card revenue-card">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Users <span>| Overall</span></h5>
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-currency-dollar" />
                                            </div>
                                            <div className="ps-3">
                                                <h6>₹125639</h6>
                                                <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-12">
                                <div className="card info-card customers-card">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Tasks <span>| Total</span></h5>
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-people" />
                                            </div>
                                            <div className="ps-3">
                                                <h6>20</h6>
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
                                    <h5 className="card-title">Bar Chart of OverAll Clients Sales</h5>
                                    {/* Bar Chart */}
                                    <canvas id="barChart" style={{ maxHeight: '400px' }}></canvas>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}

export default AdminDashboard