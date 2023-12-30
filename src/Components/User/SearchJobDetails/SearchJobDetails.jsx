import React, { useEffect } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../AuthManager/AuthManager'
import { useDispatch, useSelector } from 'react-redux'
import { fetchprojectdetails } from '../../../Redux/TaskSlice/TaskSlice'
import { fetchalluserclients } from '../../../Redux/ClientSlice/ClientSlice'
import { fetchalluserwriters } from '../../../Redux/WriterSlice/WriterSlice'

const SearchJobDetails = () => {
  const { searchQuery } = useParams();
  const [auth,] = useAuth();
  const dispatch = useDispatch()
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

  // Fetch the Client Name here
  const getClientName = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    return client ? client.name : 'Unknown Client';
  };
  const getWriterName = (userId) => {
    const writerData = writers.find((user) => user._id === userId);
    return writerData ? writerData.name : 'Unknown Writer';
  };

  const filteredjobs = projects.filter((task) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const titleLower = task.title?.toLowerCase() || '';
    const actualprice = task.actualprice?.toLowerCase() || '';
    const writerprice = task.writeprice?.toLowerCase() || '';
    const jobdetails = task.jobdetails?.toLowerCase() || '';
    const jobid = task.jobid?.toLowerCase() || '';
    return (
      titleLower.includes(searchQueryLower) ||
      actualprice.includes(searchQueryLower) ||
      writerprice.includes(searchQueryLower) ||
      jobdetails.includes(searchQueryLower) ||
      jobid.includes(searchQueryLower)
    );
  });
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Search Records</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
              <li class="breadcrumb-item active">Search Records</li>
            </ol>
          </nav>
        </div>

        {/* Serach Results */}
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
              filteredjobs?.map((item, ey) => {
                return (
                  <>
                    <tr>
                      <td data-label="Job ID">{item?.jobid}</td>
                      <td data-label="Client Name">{getClientName(item.clientname)}</td>
                      <td data-label="Start Date">{item.startdate?.slice(0, 10)}</td>
                      <td data-label="End Date">{item.enddate?.slice(0, 10)}</td>
                      <td data-label="Writer Name">{getWriterName(item.writername)}</td>
                      <td data-label="Job Status" style={{
                        color: item.jobstatus ? 'green' : 'red',
                        fontWeight: 'bold',
                      }}>{item.jobstatus ? "Onging" : "Completed"}</td>
                      <td data-label="Action">
                        <Link to={`/singletaskdetails/${item?._id}`} className='btn btn-primary btn-sm' size='small' variant='contained'><i class="bi bi-eye-fill"></i></Link>
                      </td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </table>

      </main>
    </>
  )
}

export default SearchJobDetails