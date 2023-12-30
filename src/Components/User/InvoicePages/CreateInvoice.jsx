import React, { useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import Sidebar from '../../Common/Sidebar'
import { useAuth } from '../../AuthManager/AuthManager';
import { useDispatch, useSelector } from 'react-redux';
import { fetchalluserclients } from '../../../Redux/ClientSlice/ClientSlice';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { AxiosInstance } from '../../../APIManager/AxiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const CreateInvoice = () => {
  const [auth,] = useAuth();
  const [saveload, setsaveload] = useState(false)
  const dispatch = useDispatch()
  const { clients, loading } = useSelector((state) => state.client)

  useEffect(() => {
    if (auth?.user?._id) {
      dispatch(fetchalluserclients(auth?.user?._id))
    }
  }, [dispatch, auth?.user?._id])

  // Create Invoice Function here
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  const onSubmit = async (data) => {
    console.log("Users id", auth?.user?._id);
    data.userId = auth?.user?._id
    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);
    // console.log(data);
    setsaveload(true)
    try {
      const response = await AxiosInstance.post("invoice/generateinvoice", data)
      if (response.data.success) {
        // toast.success(response.data.message)
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        })
        navigate('/ViewInvoice')
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
      setsaveload(false)
    }
  }

  return (
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

        {/* Create Invoices */}

        <center>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Invoice Reports</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"><b>Select Client Name</b></label>
                  <div className="col-sm-10">
                    <select class="form-select" aria-label="Default select example" {...register("clientName", { required: true })}>
                      <option selected>Open this select menu</option>
                      {
                        clients?.map((item, key) => {
                          return (
                            <>
                              <option value={item?._id}>{item?.name}</option>
                            </>
                          )
                        })
                      }
                    </select>
                  </div>
                  {errors.clientName?.type === "required" && <p>Client Name is Required</p>}
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"><b>Month Start date</b></label>
                  <div className="col-sm-10">
                    <input type="date" className="form-control" id="inputPassword" {...register("startDate", { required: true })} />
                  </div>
                </div>
                {errors.startDate?.type === "required" && <p>Start Date is Required</p>}
                <div className="row mb-3">
                  <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"><b>Month End date</b></label>
                  <div className="col-sm-10">
                    <input type="date" className="form-control" id="inputPassword" {...register("endDate", { required: true })} />
                  </div>
                </div>
                {errors.endDate?.type === "required" && <p>End Date is Required</p>}
                <div className="text-center">
                  {saveload ? (
                    <><button type="submit" className="btn btn-secondary  rounded-pill" disabled>
                      <BeatLoader
                        color="#0d1be9"
                        size={7}
                      /></button></>
                  ) : (
                    <><button type="submit" className="btn btn-info  rounded-pill">Submit</button></>
                  )}&nbsp;
                  <button type="reset" className="btn btn-secondary rounded-pill">Reset</button>
                </div>
              </form>
            </div>
          </div>
        </center>
      </main>
    </>
  )
}

export default CreateInvoice