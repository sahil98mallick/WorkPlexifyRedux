import React, { useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthManager/AuthManager'
import { AxiosInstance } from '../../../APIManager/AxiosInstance'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { BeatLoader } from 'react-spinners'

const UpdateProfile = () => {
  const [auth, setauth] = useAuth();
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false)
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    data.userType = auth?.user?.userType
    data.name = auth?.user?.name
    data.activestatus = auth?.user?.activestatus
    data.email = auth?.user?.email
    console.log(data);
    setisloading(true)
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('userType', data.userType);
      formData.append('activestatus', data.activestatus);
      formData.append('Image', data.Image[0]);
      const response = await AxiosInstance.put(`users/updateuserdetail/${auth?.user?._id}`, formData)
      console.log(response);
      if (response.data.success) {
        // toast.success(response.data.message)
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        })
        navigate("/Profile")
      } else {
        // toast.error(response.data.message)
        Swal.fire({
          icon: 'error',
          title: response.data.message,
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        })
      }
    } catch (error) {
      // toast.error(error.message)
      Swal.fire({
        icon: 'warning',
        title: error.message,
        text: error.message,
        timer: 2000,
        showConfirmButton: false,
      })
    } finally {
      setisloading(false)
    }
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


        <section class="section profile">
          <div class="row">
            <div class="col-xl-4">

              <div class="card">
                <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

                  <img src={auth?.user?.Image} alt="Profile" className='profileimage' />
                  <h2>{auth?.user?.name}</h2>
                  <h3>Web Designer</h3>
                  <div class="social-links mt-2">
                    <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                    <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                    <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                    <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                  </div><br />
                </div>
              </div>

            </div>

            <div class="col-xl-8">
              <div class="card">
                <div class="card-body pt-3">
                  <form class="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <div class="col-12">
                      <label for="yourName" class="form-label">Your Name</label>
                      <input type="text" class="form-control"
                        value={auth?.user?.name} disabled />
                    </div>
                    {errors.name?.type === "required" && <p>Name is Required</p>}

                    <div class="col-12">
                      <label for="yourEmail" class="form-label">Your Email</label>
                      <input type="email" class="form-control"
                        value={auth?.user?.email} disabled />
                    </div>
                    {errors.email?.type === "required" && <p>Email is Required</p>}
                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Phone</label>
                      <div class="input-group has-validation">
                        <input type="number" class="form-control"
                          {...register("phone", { required: true })} />
                      </div>
                      {errors.phone?.type === "required" && <p>Phone is Required</p>}
                    </div>
                    <div class="col-12">
                      <label class="form-label">Profile Image</label>
                      <input type="file" class="form-control"
                        {...register("Image", { required: true })} accept="image/*" />
                    </div>
                    {errors.Image?.type === "required" && <p>Image is Required</p>}
                    <div class="col-2">
                      {
                        isloading ? (
                          <><button class="btn btn-secondary w-100" type="submit" disabled>
                            <BeatLoader
                              color="#0d1be9"
                              size={10}
                            /></button></>
                        ) : (
                          <><button class="btn btn-info w-100" type="submit">Update</button></>
                        )
                      }
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default UpdateProfile