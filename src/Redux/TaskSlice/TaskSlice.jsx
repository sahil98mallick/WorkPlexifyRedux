import { AxiosInstance } from "../../APIManager/AxiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    projects: [],
    loading: false,
    singleprojects: {},
    totalamounts: [],
    totalJobAmount: "",
    ongingjobs: [],
    completedjobs: [],
    presentmonthincomes: []
}

// Fetch users Clinets details by userID
export const fetchprojectdetails = createAsyncThunk(
    'userstasks',
    async (userid) => {
        const response = await AxiosInstance.get(`jobdetails/jobsbyuserid/${userid}`)
        return response?.data?.jobData
    }
)

// Fetch users Clinets details by id
export const fetchpsinglerojectdetails = createAsyncThunk(
    'singletasks',
    async (id) => {
        const response = await AxiosInstance.get(`jobdetails/singlejob/${id}`)
        return response?.data?.finddata
    }
)

// Fetch users Clinets total amounts jobs by userid
export const fetchclienttotalamountjobs = createAsyncThunk(
    'totalamounts',
    async (userid) => {
        const response = await AxiosInstance.get(`jobdetails/clientstotalamounts/${userid}`)
        return response?.data?.totalAmountsByUser
    }
)
// Fetch users Clinets total amounts jobs by userid
export const fetchcurrentmonthamounts = createAsyncThunk(
    'fetchcurrentmonthamounts',
    async (userid) => {
        const response = await AxiosInstance.get(`jobdetails/presentmonthincomes/${userid}`)
        return response?.data?.totalIncomesByClients
    }
)


// Fetch users Clinets total amounts jobs by userid
export const totaljobamounts = createAsyncThunk(
    'totaljobamounts',
    async (userid) => {
        const response = await AxiosInstance.get(`jobdetails/overalljobamounts/${userid}`)
        return response?.data?.totalJobAmount
    }
)

// Fetch ongoing jobs by userid
export const fetchongingjobs = createAsyncThunk(
    'onlingjobs',
    async (userid) => {
        const response = await AxiosInstance.get(`jobdetails/ongoingjobs/${userid}`)
        return response?.data?.ongoingJobs
    }
)

// Fetch ongoing jobs by userid
export const fetchcompletedjobs = createAsyncThunk(
    'completedjobs',
    async (userid) => {
        const response = await AxiosInstance.get(`jobdetails/completedjobs/${userid}`)
        return response?.data?.completedJobs
    }
)


const taskSlice = createSlice({
    name: "taskslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchprojectdetails.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchprojectdetails.fulfilled, (state, action) => {
            state.projects = action.payload
            state.loading = false
        });
        builder.addCase(fetchprojectdetails.rejected, (state, action) => {
            state.loading = false
        });

        // Fetch Single Details
        builder.addCase(fetchpsinglerojectdetails.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchpsinglerojectdetails.fulfilled, (state, action) => {
            if (action.payload) {
                state.singleprojects = action.payload
                state.loading = false
            }
        });
        builder.addCase(fetchpsinglerojectdetails.rejected, (state, action) => {
            state.loading = false
        });
        // Fetch Clients Total Amounts Details
        builder.addCase(fetchclienttotalamountjobs.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchclienttotalamountjobs.fulfilled, (state, action) => {
            state.totalamounts = action.payload
            state.loading = false
        });
        builder.addCase(fetchclienttotalamountjobs.rejected, (state, action) => {
            state.loading = false
        });


        // Fetch Clients Total Amounts Details
        builder.addCase(totaljobamounts.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(totaljobamounts.fulfilled, (state, action) => {
            state.totalJobAmount = action.payload
            state.loading = false
        });
        builder.addCase(totaljobamounts.rejected, (state, action) => {
            state.loading = false
        });

        // Fetch onliging jobs Details
        builder.addCase(fetchongingjobs.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchongingjobs.fulfilled, (state, action) => {
            state.ongingjobs = action.payload
            state.loading = false
        });
        builder.addCase(fetchongingjobs.rejected, (state, action) => {
            state.loading = false
        });
        // Fetch completed jobs Details
        builder.addCase(fetchcompletedjobs.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchcompletedjobs.fulfilled, (state, action) => {
            state.completedjobs = action.payload
            state.loading = false
        });
        builder.addCase(fetchcompletedjobs.rejected, (state, action) => {
            state.loading = false
        });

        // Present Month Total Incomes
        builder.addCase(fetchcurrentmonthamounts.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchcurrentmonthamounts.fulfilled, (state, action) => {
            state.presentmonthincomes = action.payload
            state.loading = false
        });
        builder.addCase(fetchcurrentmonthamounts.rejected, (state, action) => {
            state.loading = false
        });

    }
})

export default taskSlice.reducer