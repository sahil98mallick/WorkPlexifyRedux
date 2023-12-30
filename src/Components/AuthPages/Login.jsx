import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AxiosInstance } from '../../APIManager/AxiosInstance';
import { useAuth } from '../AuthManager/AuthManager';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

const Login = () => {
  const [auth, setauth] = useAuth();
  const [isLoading, setisloading] = useState(false)
  const navigate = useNavigate();
  const encryptAndSaveToLocalStorage = (key, data) => {
    try {
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'sahilworkplexify').toString();
      localStorage.setItem(key, encryptedData);
    } catch (error) {
      console.error('Error encrypting and saving to localStorage:', error);
    }
  };
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    setisloading(true);
    try {
      const response = await AxiosInstance.post("users/login", data);
      // console.log(response);
      const logindt = response?.data;
      if (logindt?.success) {
        if (logindt?.user?.userType === "User" && logindt?.user?.activestatus === true) {
          toast.success(logindt?.message)
          setauth({
            ...auth,
            user: logindt?.user,
            token: logindt?.token,
          });
          encryptAndSaveToLocalStorage('authenticate', logindt);
          navigate('/UserDashboard');
        } else if (logindt?.user?.userType === "Admin" && logindt?.user?.activestatus === true) {
          setauth({
            ...auth,
            user: logindt?.user,
            token: logindt?.token,
          });
          encryptAndSaveToLocalStorage('authenticate', logindt);
          navigate('/AdminDashboard');
        } else if (logindt?.user?.activestatus === false) {
          toast.error("Your account is blocked....Please Contact Your Administration");
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: logindt?.message,
          timer: 2000,
          showConfirmButton: false,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.message,
        timer: 3000,
        showConfirmButton: false,
      })
    } finally {
      setisloading(false);
    }
  };
  return (
    <>

      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a className="logo d-flex align-items-center w-auto">
                      <img src="assets/img/WorkPlexifyLogo5.png" alt="loginimage" />
                      <span className="d-none d-lg-block">Work-Plexify</span>
                    </a>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-2 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p className="text-center small">Enter your Email &amp; password to login</p>
                        <hr />
                      </div>
                      <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">Email</label>
                          <div className="input-group has-validation">
                            <input type="email" className="form-control" id="yourUsername" required
                              {...register("email", { required: true })} />
                            {errors.email?.type === "required" && <p>Email is Required</p>}
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Password</label>
                          <input type="password" className="form-control" id="yourPassword" required
                            {...register("password", { required: true })} />
                          {errors.password?.type === "required" && <p>Password is Required</p>}
                        </div>
                        <center>
                          <br />
                          <div className="col-4">
                            {
                              isLoading ? (
                                <><button className="btn btn-secondary w-100" type="submit" disabled>Loading.....</button></>
                              ) : (
                                <><button className="btn btn-primary w-100" type="submit">Login</button></>
                              )
                            }
                          </div>
                        </center>

                        <div style={{ display: "flex", justifyContent: "space-evenly", textAlign: "center" }}>

                          <div className="col-6">
                            <p className="small mb-0"><Link to='/Register'>Create Accounts</Link></p>
                          </div>
                          <div className="col-6">
                            <p className="small mb-0"><Link to='/ResetPassword'>Forgot Password</Link></p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="credits">
                    Designed by <a href="#">Sahil Mallick</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

    </>
  )
}

export default Login