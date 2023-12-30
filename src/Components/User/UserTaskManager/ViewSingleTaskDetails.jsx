import React, { useEffect } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../AuthManager/AuthManager'
import { useDispatch, useSelector } from 'react-redux'
import { fetchpsinglerojectdetails } from '../../../Redux/TaskSlice/TaskSlice'
import { fetchalluserwriters } from '../../../Redux/WriterSlice/WriterSlice'
import { fetchalluserclients } from '../../../Redux/ClientSlice/ClientSlice'
import { SquareLoader } from 'react-spinners'

const ViewsingleprojectsDetails = () => {
  const [auth,] = useAuth()
  const { id } = useParams();
  const dispatch = useDispatch()
  const { clients } = useSelector((state) => state.client)
  const { singleprojects, loading } = useSelector((state) => state.task);
  const { writers } = useSelector((state) => state.writer)
  useEffect(() => {
    if (auth?.user?._id) {
      dispatch(fetchpsinglerojectdetails(id));
      dispatch(fetchalluserclients(auth?.user?._id))
      dispatch(fetchalluserwriters(auth?.user?._id))
    }
  }, [dispatch, id, auth?.user?._id])

  const getClientName = (clientId) => {
    const client = clients.find((client) => client?._id === clientId);
    return client ? client?.name : 'Unknown Client';
  };

  const getWriterName = (writerId) => {
    const writer = writers.find((writer) => writer?._id === writerId);
    return writer ? writer?.name : 'Unknown Writer';
  };

  console.log(singleprojects);
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Project Details</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
              <li class="breadcrumb-item active">Dashboard</li>
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
              <section class="section profile">
                <div class="row">
                  <div class="col-xl-12">
                    <div class="card">
                      <div class="card-body pt-3">
                        <center><h3 style={{ fontFamily: "Times" }}>Overview of Job ID: <Link>{singleprojects?.jobid}</Link></h3></center>
                        <div class="tab-content pt-2">
                          <div class="tab-pane fade show active profile-overview" id="profile-overview">
                            <h5 class="card-title">Task Descriptions</h5>
                            <p class="small fst-italic">
                              {singleprojects?.jobdetails}
                            </p>

                            <center><h5 class="card-title">Task Details</h5></center>
                            <div class="row">
                              <div class="col-lg-3 col-md-4 label ">Writer Name</div>
                              <div class="col-lg-9 col-md-8">{getWriterName(singleprojects?.writername)}</div>
                            </div>
                            <div class="row">
                              <div class="col-lg-3 col-md-4 label">Client Name</div>
                              <div class="col-lg-9 col-md-8">{getClientName(singleprojects?.clientname)}</div>
                            </div>
                            <div class="row">
                              <div class="col-lg-3 col-md-4 label">Start Date</div>
                              <div class="col-lg-9 col-md-8">{singleprojects?.startdate?.slice(0, 10)}</div>
                            </div>
                            <div class="row">
                              <div class="col-lg-3 col-md-4 label">End Date</div>
                              <div class="col-lg-9 col-md-8">{singleprojects?.enddate?.slice(0, 10)}</div>
                            </div>
                            <div class="row">
                              <div class="col-lg-3 col-md-4 label">Actual Price</div>
                              <div class="col-lg-9 col-md-8">{singleprojects?.actualprice}</div>
                            </div>

                            <div class="row">
                              <div class="col-lg-3 col-md-4 label">Writer Price</div>
                              <div class="col-lg-9 col-md-8">{singleprojects?.writeprice}</div>
                            </div>

                            <div class="row">
                              <div class="col-lg-3 col-md-4 label">Task Status</div>
                              <div class="col-lg-9 col-md-8">{singleprojects?.jobstatus ? (<><p style={{ color: "red" }}>On-Going</p></>) : (<><p style={{ color: "green", fontSize: "20px", fontWeight: "600" }}>Completed</p></>)}</div>
                            </div>
                          </div>
                          <Link to='/ViewTaskDetails' className='btn btn-warning'><i class="bi bi-arrow-bar-left"></i>Back</Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </>
          )
        }
      </main>
    </>
  )
}

export default ViewsingleprojectsDetails