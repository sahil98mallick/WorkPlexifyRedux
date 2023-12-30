import { AxiosInstance } from "../../APIManager/AxiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    adminclients: [],
    adminwriters: [],
    adminprojects: [],
    admininvoices: [],
    adminusers: [],
    loading: false,
}

// Fetch all Clinets details by admin
export const fetchalladminclients = createAsyncThunk(
    'fetchalladminclients',
    async () => {
        const response = await AxiosInstance.get("clients/allclients")
        return response?.data?.clientData
    }
)

// Fetch all Writers details by admin
export const fetchalladminwriters = createAsyncThunk(
    'fetchalladminwriters',
    async () => {
        const response = await AxiosInstance.get("writers/allwriters")
        return response?.data?.writerData
    }
)

// Fetch all jobs details by admin
export const fetchalladminprojects = createAsyncThunk(
    'fetchalladminprojects',
    async () => {
        const response = await AxiosInstance.get("jobdetails/alljobs")
        return response?.data?.jobData
    }
)

// Fetch all invoices details by admin
export const fetchalladmininvoices = createAsyncThunk(
    'fetchalladmininvoices',
    async () => {
        const response = await AxiosInstance.get("invoice/allinvoice")
        return response?.data?.invoiceData
    }
)

// Fetch all invoices details by admin
export const fetchalladminusers = createAsyncThunk(
    'fetchalladminusers',
    async () => {
        const response = await AxiosInstance.get("users/allusers")
        return response?.data?.usersData
    }
)


const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Clients
        builder.addCase(fetchalladminclients.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchalladminclients.fulfilled, (state, action) => {
            state.adminclients = action.payload
            state.loading = false
        });
        builder.addCase(fetchalladminclients.rejected, (state, action) => {
            state.loading = false
        });

        // Fetch Writers
        builder.addCase(fetchalladminwriters.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchalladminwriters.fulfilled, (state, action) => {
            state.adminwriters = action.payload
            state.loading = false
        });
        builder.addCase(fetchalladminwriters.rejected, (state, action) => {
            state.loading = false
        });
        // Fetch Jobs
        builder.addCase(fetchalladminprojects.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchalladminprojects.fulfilled, (state, action) => {
            state.adminprojects = action.payload
            state.loading = false
        });
        builder.addCase(fetchalladminprojects.rejected, (state, action) => {
            state.loading = false
        });
        // Fetch Invoices
        builder.addCase(fetchalladmininvoices.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchalladmininvoices.fulfilled, (state, action) => {
            state.admininvoices = action.payload
            state.loading = false
        });
        builder.addCase(fetchalladmininvoices.rejected, (state, action) => {
            state.loading = false
        });
        // Fetch Users
        builder.addCase(fetchalladminusers.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchalladminusers.fulfilled, (state, action) => {
            state.adminusers = action.payload
            state.loading = false
        });
        builder.addCase(fetchalladminusers.rejected, (state, action) => {
            state.loading = false
        });
    }
})

export default adminSlice.reducer