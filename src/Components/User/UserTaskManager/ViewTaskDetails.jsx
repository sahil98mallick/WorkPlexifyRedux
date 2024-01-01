import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { useAuth } from '../../AuthManager/AuthManager';
import { useDispatch, useSelector } from 'react-redux';
import { fetchprojectdetails } from '../../../Redux/TaskSlice/TaskSlice';
import { Link } from 'react-router-dom';
import { fetchalluserclients } from '../../../Redux/ClientSlice/ClientSlice';
import Swal from 'sweetalert2';
import { AxiosInstance } from '../../../APIManager/AxiosInstance';
import { toast } from 'react-toastify';
import { SquareLoader } from 'react-spinners';
import { fetchalluserwriters } from '../../../Redux/WriterSlice/WriterSlice';

const ViewTaskDetails = () => {
  const [auth,] = useAuth();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredprojects, setfilteredprojectss] = useState([]);
  const { projects, loading } = useSelector((state) => state.task)
  const { clients } = useSelector((state) => state.client);
  const { writers } = useSelector((state) => state.writer)

  useEffect(() => {
    if (auth?.user?._id) {
      dispatch(fetchprojectdetails(auth?.user?._id));
      dispatch(fetchalluserclients(auth?.user?._id))
      dispatch(fetchalluserwriters(auth?.user?._id))
    }
  }, [dispatch, auth?.user?._id])

  useEffect(() => {
    // Filter Income based on searchTerm
    const filteredData = projects?.filter(item =>
      item?.jobid.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.startdate.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.enddate.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setfilteredprojectss(filteredData);
  }, [searchTerm, projects]);

  // Fetch the Client Name here
  const getClientName = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    return client ? client.name : 'Unknown Client';
  };
  const getWriterName = (userId) => {
    const writerData = writers.find((user) => user._id === userId);
    return writerData ? writerData.name : 'Unknown Writer';
  };

  // Delete task  Details Function
  const deletetaskdetails = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this client record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const deletedata = await AxiosInstance.delete(`jobdetails/deletejob/${id}`);
        if (deletedata.data.success) {
          Swal.fire({
            icon: 'success',
            title: deletedata.data.message,
            text: deletedata.data.message,
            timer: 1000,
            showConfirmButton: false,
          });
          dispatch(fetchprojectdetails(auth?.user?._id));
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
      dispatch(fetchprojectdetails(auth?.user?._id));
    }
  }


  // Function to update task active status
  const [task, settask] = useState([]);
  const handleStatusChange = async (taskiId, newStatus) => {
    try {
      const data = { jobstatus: newStatus };

      const response = await AxiosInstance.put(`jobdetails/updatejobstatus/${taskiId}`, data);
      if (response.status === 200) {
        toast.success(response?.data?.message)
        const updatedtask = task.map(item => {
          if (item._id === taskiId) {
            return { ...item, jobstatus: newStatus };
          }
          return item;
        });
        settask(updatedtask);
        dispatch(fetchprojectdetails(auth?.user?._id));
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // // Sort projects in descending order based on createdAt
  // const sortedProjects = filteredprojects
  //   .slice()
  //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Sort projects with active status first, then by createdAt in descending order
  const sortedProjects = filteredprojects
    .slice()
    .sort((a, b) => {
      // First, sort by active status (true first)
      if (b.jobstatus && !a.jobstatus) {
        return 1;
      } else if (!b.jobstatus && a.jobstatus) {
        return -1;
      }

      // If active status is the same, then sort by createdAt
      return new Date(b.createdAt) - new Date(a.createdAt);
    });



  // Pagination Code
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPageCount = Math.ceil(sortedProjects.length / itemsPerPage);
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
          <h1>Projects</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
              <li class="breadcrumb-item active">Projects</li>
            </ol>
          </nav>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
          <Link to='/AddTaskDetails' type="button" class="btn btn-primary">Add New Projects</Link>
          <input type="text" className='form-control' placeholder='Search Here' onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "300px" }} />
        </div>
        {/* Main Contents */}
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
                projects?.length > 0 ? (
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
                          currentItems?.map((item, key) => {
                            return (
                              <>
                                <tr key={key}>
                                  <td data-label="Job ID"><Link to={`/ViewSingleTaskDetails/${item?._id}`}>{item?.jobid?.slice(0, 25)}</Link></td>
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
                                      <button onClick={() => handleStatusChange(item._id, !item.jobstatus)}
                                        style={{
                                          background: item.jobstatus ? 'red' : 'green',
                                          color: "white", fontFamily: "Times"
                                        }} className='btn btn-success btn-sm'><i class="bi bi-toggle-on"></i></button>&nbsp;
                                      <Link to={`/UpdateTaskDetails/${item?._id}`} className='btn btn-success btn-sm'><i class="bi bi-pencil"></i></Link>&nbsp;
                                      <button className='btn btn-primary btn-sm'><i class="bi bi-eye-fill"></i></button>&nbsp;
                                      <button onClick={() => { deletetaskdetails(item._id) }} className='btn btn-danger btn-sm'><i class="bi bi-trash3-fill"></i></button>
                                    </div>
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
                    <h2 style={{ textAlign: "center", fontFamily: "Times", fontWeight: "600", marginTop: "10px", color: "green" }}>No Project Added From your Accounts</h2>
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

export default ViewTaskDetails