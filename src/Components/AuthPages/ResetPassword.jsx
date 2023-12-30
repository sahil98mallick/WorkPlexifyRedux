import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthManager/AuthManager';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AxiosInstance } from '../../APIManager/AxiosInstance';

const ResetPassword = () => {
    const [auth, setauth] = useAuth();
    const [isLoading, setisloading] = useState(false)
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        // console.log(data);
        setisloading(true);
        try {
            const response = await AxiosInstance.put("users/resetpassword", data);
            const resetpassworddt = response?.data;
            if (resetpassworddt?.success) {
                toast.success(resetpassworddt.message)
                navigate('/')
            } else {
                toast.error(resetpassworddt.message)
            }
        } catch (error) {
            toast.error(error.message);
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
                                            <img src="/assets/logo/workplexifylogo.png" alt />
                                            <span className="d-none d-lg-block">Work-Plexify</span>
                                        </a>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-2 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Reset Your Password</h5>
                                                <hr />
                                            </div>
                                            <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Email</label>
                                                    <div className="input-group has-validation">
                                                        <input type="email" className="form-control" id="yourUsername" {...register("email", { required: true })} />
                                                    </div>
                                                    {errors.email?.type === "required" && <p>Email is Required</p>}
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Mobile Number</label>
                                                    <div className="input-group has-validation">
                                                        <input type="number" className="form-control" id="yourUsername" {...register("phone", { required: true })} />
                                                    </div>
                                                    {errors.phone?.type === "required" && <p>Phone is Required</p>}
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                                    <input type="password" className="form-control" id="yourPassword" {...register("newPassword", { required: true })} />
                                                </div>
                                                {errors.newPassword?.type === "required" && <p>New Password is Required</p>}
                                                <center>
                                                    <br />
                                                    <div className="col-5">
                                                        <button className="btn btn-primary" type="submit">Reset</button>
                                                    </div>
                                                </center>
                                                <div style={{ display: "flex", justifyContent: "space-evenly", textAlign: "center" }}>
                                                    <div className="col-6">
                                                        <p className="small mb-0"><Link to='/'>Login Here</Link></p>
                                                    </div>
                                                    <div className="col-6">
                                                        <p className="small mb-0"><Link to='/Register'>Register Here</Link></p>
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

export default ResetPassword