import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../AuthManager/AuthManager'
import { fetchinvoicedetails } from '../../../Redux/InvoiceSlice/InvoiceSlice'
import { SquareLoader } from 'react-spinners'
import { fetchalluserclients } from '../../../Redux/ClientSlice/ClientSlice'
import { AxiosInstance } from '../../../APIManager/AxiosInstance'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const ViewInvoice = () => {
  const [auth,] = useAuth();
  const dispatch = useDispatch()
  const { invoices, loading } = useSelector((state) => state.invoice)
  const { clients } = useSelector((state) => state.client);
  useEffect(() => {
    if (auth?.user?._id) {
      dispatch(fetchinvoicedetails(auth?.user?._id));
      dispatch(fetchalluserclients(auth?.user?._id))
    }
  }, [dispatch, auth?.user?._id])

  // Fetch the Client Name here
  const getClientName = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  // Delete Invoices
  const deleteinvoicerecord = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Invoice record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const deletedata = await AxiosInstance.delete(`invoice/deleteclientinvoice/${id}`);
        if (deletedata.data.success) {
          Swal.fire({
            icon: 'success',
            title: deletedata.data.message,
            text: deletedata.data.message,
            timer: 1000,
            showConfirmButton: false,
          });
          dispatch(fetchinvoicedetails(auth?.user?._id));
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
      dispatch(fetchinvoicedetails(auth?.user?._id));
    }
  };

  // Pagination Code
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPageCount = Math.ceil(invoices.length / itemsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPageCount) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <>
      <>
        <Navbar />
        <Sidebar />
        <main id="main" class="main">
          <div class="pagetitle">
            <h1>Invoices</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
                <li class="breadcrumb-item active">Invoices</li>
              </ol>
            </nav>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
            <Link to='/CreateInvoice' type="button" class="btn btn-secondary">New</Link>
            <input type="text" className='form-control' placeholder='Search Here' style={{ width: "300px" }} />
          </div>
          {/* View Invoices */}

          {
            invoices?.length > 0 ? (
              <>
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
                      <table class="restable">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Client Name</th>
                            <th>Generated Date</th>
                            <th>Total Amounts%</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            currentItems?.map((item, key) => {
                              return (
                                <>
                                  <tr>
                                    <td data-label="S.No">{key + 1}</td>
                                    <td data-label="Name">{getClientName(item?.client)}</td>
                                    <td data-label="Age">{item?.invoiceDate?.slice(0, 10)}</td>
                                    <td data-label="Marks%">{item?.totalAmount}</td>
                                    <td data-label="Staus">{item?.invoiceStatus}</td>
                                    <td data-label="Staus">
                                      <Link to={`/PrintInvoiceDetails/${item?._id}`} className='btn btn-warning btn-sm'><i class="bi bi-printer"></i></Link>&nbsp;
                                      <button className='btn btn-success btn-sm'><i class="bi bi-pencil"></i></button>&nbsp;
                                      <button onClick={() => { deleteinvoicerecord(item?._id) }}
                                        className='btn btn-danger btn-sm'><i class="bi bi-trash3-fill"></i></button>
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
                  )
                }
              </>
            ) : (
              <>
                <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>No Invoice Generated From your Accounts</h2>
              </>
            )
          }
        </main>
      </>
    </>
  )
}

export default ViewInvoice