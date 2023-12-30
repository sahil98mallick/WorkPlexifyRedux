import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { AxiosInstance } from '../../APIManager/AxiosInstance';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [isloading, setisloading] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        data.userType = "User"
        data.activestatus = true;
        setisloading(true)
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('userType', data.userType);
            formData.append('activestatus', data.activestatus);
            formData.append('Image', data.Image[0]);
            const response = await AxiosInstance.post("users/userregister", formData)
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setisloading(false)
        }
    }
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
                                                <h5 className="card-title text-center pb-0 fs-4">Register Your Account</h5>
                                                <hr />
                                            </div>
                                            <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                                <div className="col-6">
                                                    <label htmlFor="yourUsername" className="form-label">Company Name</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text" name="username" className="form-control"  {...register("name", { required: true })} />
                                                    </div>
                                                    {errors.name?.type === "required" && <p>Company Name is Required</p>}
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="yourUsername" className="form-label">Mobile Number</label>
                                                    <div className="input-group has-validation">
                                                        <input type="number" name="username" className="form-control" {...register("phone", { required: true })} />
                                                    </div>
                                                    {errors.phone?.type === "required" && <p>Phone is Required</p>}
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Email</label>
                                                    <div className="input-group has-validation">
                                                        <input type="email" name="username" className="form-control" {...register("email", { required: true })} />
                                                    </div>
                                                </div>
                                                {errors.email?.type === "required" && <p>Email is Required</p>}
                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                                    <input type="password" className="form-control"  {...register("password", { required: true })} />
                                                </div>
                                                {errors.password?.type === "required" && <p>Password is Required</p>}
                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Profile Image</label>
                                                    <input type="file" className="form-control"  {...register("Image", { required: true })} accept="image/*" />
                                                </div>
                                                {errors.Image?.type === "required" && <p>Image is Required</p>}
                                                <center>
                                                    <br />
                                                    {
                                                        isloading ? (
                                                            <> <div className="col-4">
                                                                <button className="btn btn-secondary w-100" type="submit" disabled>
                                                                    Loading ....
                                                                </button>
                                                            </div></>
                                                        ) : (
                                                            <>
                                                                <div className="col-4">
                                                                    <button className="btn btn-primary w-100" type="submit">Register</button>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                </center>
                                                <div style={{ display: "flex", justifyContent: "space-evenly", textAlign: "center" }}>
                                                    <div className="col-6">
                                                        <p className="small mb-0"><Link to='/'>Login Here</Link></p>
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

export default Register