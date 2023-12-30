import React, { useEffect } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthManager/AuthManager';
import { useDispatch, useSelector } from 'react-redux';
import { fetchsingleinvoice } from '../../../Redux/InvoiceSlice/InvoiceSlice';
import { fetchalluserclients } from '../../../Redux/ClientSlice/ClientSlice';
import { fetchprojectdetails } from '../../../Redux/TaskSlice/TaskSlice';
import { SquareLoader } from 'react-spinners';

const PrintInvoiceDetails = () => {
  const { id } = useParams();
  const [auth, setauth] = useAuth();
  const dispatch = useDispatch()
  const { singleinvoice, loading } = useSelector((state) => state.invoice);
  const { clients } = useSelector((state) => state.client)
  const { projects } = useSelector((state) => state.task)
  useEffect(() => {
    if (auth?.user?._id && id) {
      dispatch(fetchsingleinvoice(id));
      dispatch(fetchalluserclients(auth?.user?._id))
      dispatch(fetchprojectdetails(auth?.user?._id));
    }
  }, [dispatch, auth?.user?._id, id])


  const getClientName = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  const matchingJobsDetails = singleinvoice.jobs
    ? projects.filter((job) => singleinvoice.jobs.includes(job._id))
    : [];

  const handlePrint = () => {
    const pageTitle = document.querySelector('.pagetitle');
    if (pageTitle) {
      pageTitle.style.display = 'none';
    }
    window.print();
    if (pageTitle) {
      pageTitle.style.display = 'block';
    }
  };
  return (
    <>
      <>
        <Navbar />
        <Sidebar />
        <main id="main" class="main">
          <div class="pagetitle">
            <h1>Print Invoices</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
                <li class="breadcrumb-item active">Print Invoices</li>
              </ol>
            </nav>
          </div>


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
                <section class="section dashboard">
                  <div class="invoice-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/2534/2534203.png" alt="Company Logo" class="company-logo" />
                    <div class="invoice-header">
                      <h2>Work Plexify</h2>
                      <p>Invoice No. {singleinvoice?.invoiceID}</p>
                      <p>Date: {singleinvoice?.invoiceDate?.slice(0, 10)}<br />
                        Created Time: {singleinvoice?.invoiceDate?.slice(11, 19)}
                      </p>
                    </div>
                    <div class="invoice-body">
                      <div id='billtooandform'>
                        <div class="billed-to">
                          <strong>BILLED From:</strong>
                          <p><b>Name:</b> <i>{auth?.user?.name}</i></p>
                        </div>
                        <div class="billed-to">
                          <strong>BILLED T0:</strong>
                          <p><b>Name:</b> <i>{getClientName(singleinvoice.client)}</i></p>
                        </div>
                      </div>

                      <table class="restable">
                        <thead>
                          <tr>
                            <th>Job ID</th>
                            <th>Quantity</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            matchingJobsDetails?.map((item, key) => {
                              return (
                                <tr>
                                  <td data-label="Job ID">{item?.jobid}</td>
                                  <td data-label="Quantity">1</td>
                                  <td data-label="Start Date">{item?.startdate?.slice(0, 10)}</td>
                                  <td data-label="End Date">{item?.enddate?.slice(0, 10)}</td>
                                  <td data-label="Total Price">{item?.actualprice}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>

                      <div class="total-calculation">
                        <hr /><br />
                        <h3><b>Total: {singleinvoice?.totalAmount}</b></h3>
                      </div>
                    </div>

                    <div class="invoice-footer">
                      <h4>Thank you!</h4>
                      <p>Visit Again with Work-Plexify</p>
                    </div>
                    <center>
                      <button className='btn btn-primary print-button' onClick={handlePrint}>
                        <i class="bi bi-printer-fill"></i>
                      </button>
                    </center>
                  </div>

                </section>
              </>
            )
          }


        </main>
      </>
    </>
  )
}

export default PrintInvoiceDetails