import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { useAuth } from '../../AuthManager/AuthManager';
import { useDispatch, useSelector } from 'react-redux';
import { fetchsingleusers } from '../../../Redux/UserSlice/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader, SquareLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AxiosInstance } from '../../../APIManager/AxiosInstance';
import { toast } from 'react-toastify';

const Profile = () => {
  const [auth,] = useAuth();
  const [saveload, setsaveload] = useState(false)
  const dispatch = useDispatch()
  const { singleusers, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (auth?.user?._id) {
      dispatch(fetchsingleusers(auth?.user?._id))
    }
  }, [dispatch, auth?.user?._id])

  // console.log(singleusers);

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    setsaveload(true)
    data.email = auth?.user?.email
    try {
      const response = await AxiosInstance.put(`/users/changepasswordfromaccount`, data)
      if (response.data) {
        toast.success(response.data.message)
        reset();
      } else {
        toast.error(response.data.message)

      }
    } catch (error) {
      // toast.error(error.message)
      Swal.fire({
        icon: 'warning',
        title: error.message,
        text: error.message,
        timer: 2000,
        showConfirmButton: true,
      })
    } finally {
      setsaveload(false)
    }
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><Link to='/UserDashboard'>Home</Link></li>
              <li class="breadcrumb-item active">Profile</li>
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
              <section className="section profile">
                <div className="row">
                  <div className="col-xl-4">
                    <div className="card">
                      <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                        <img src={singleusers?.Image} alt="Profile" className="rounded-circle" />
                        <h2>{singleusers?.name}</h2>
                        <h3>Web Designer</h3>
                        <div className="social-links mt-2">
                          <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                          <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                          <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                          <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                        </div>
                        <br />
                        <Link to='/UpdateProfile' className='btn btn-info'>Update</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8">
                    <div className="card">
                      <div className="card-body pt-3">
                        {/* Bordered Tabs */}
                        <ul className="nav nav-tabs nav-tabs-bordered" style={{ display: "flex", justifyContent: "space-evenly" }}>
                          <li className="nav-item">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                          </li>
                          <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                          </li>
                        </ul>
                        <div className="tab-content pt-2">
                          <div className="tab-pane fade show active profile-overview" id="profile-overview">
                            <h5 className="card-title">About</h5>
                            <p className="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p>
                            <h5 className="card-title">Profile Details</h5>
                            <div className="row">
                              <div className="col-lg-3 col-md-4 label ">Full Name</div>
                              <div className="col-lg-9 col-md-8">{singleusers?.name}</div>
                            </div>
                            <div className="row">
                              <div className="col-lg-3 col-md-4 label">Company</div>
                              <div className="col-lg-9 col-md-8">Work-Plexify</div>
                            </div>
                            <div className="row">
                              <div className="col-lg-3 col-md-4 label">User Type</div>
                              <div className="col-lg-9 col-md-8">{singleusers?.userType}</div>
                            </div>
                            <div className="row">
                              <div className="col-lg-3 col-md-4 label">Phone</div>
                              <div className="col-lg-9 col-md-8">{singleusers?.phone}</div>
                            </div>
                            <div className="row">
                              <div className="col-lg-3 col-md-4 label">Email</div>
                              <div className="col-lg-9 col-md-8">{singleusers?.email}</div>
                            </div>
                          </div>

                          <div className="tab-pane fade pt-3" id="profile-change-password">
                            {/* Change Password Form */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="row mb-3">
                                <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Email</label>
                                <div className="col-md-8 col-lg-9">
                                  <input type="text" className="form-control" value={auth?.user?.email} disabled />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                <div className="col-md-8 col-lg-9">
                                  <input type="password" className="form-control"  {...register("currentPassword", { required: true })} />
                                </div>
                              </div>
                              {errors.currentPassword?.type === "required" && <p>Current Password is Required</p>}
                              <div className="row mb-3">
                                <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                <div className="col-md-8 col-lg-9">
                                  <input type="password" className="form-control"
                                    {...register("newPassword", { required: true })} />
                                </div>
                              </div>
                              {errors.newPassword?.type === "required" && <p>New Password is Required</p>}
                              <div className="text-center">
                                {saveload ? (
                                  <><button type="submit" className="btn btn-secondary  rounded-pill" disabled>
                                    <BeatLoader
                                      color="#0d1be9"
                                      size={10}
                                    /></button></>
                                ) : (
                                  <><button type="submit" className="btn btn-primary  rounded-pill">Change</button></>
                                )}
                              </div>
                            </form>
                            {/* End Change Password Form */}
                          </div>
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

export default Profile