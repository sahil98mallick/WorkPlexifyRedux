import { AxiosInstance } from "../../APIManager/AxiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    invoices: [],
    loading: false,
    singleinvoice: {}
}

// Fetch users Clinets details by userID
export const fetchinvoicedetails = createAsyncThunk(
    'singleinvoices',
    async (userid) => {
        const response = await AxiosInstance.get(`invoice/allinvoicebyuser/${userid}`)
        return response?.data?.invoiceData
    }
)
// Fetch users Clinets details by userID
export const fetchsingleinvoice = createAsyncThunk(
    'usersinvoices',
    async (id) => {
        const response = await AxiosInstance.get(`invoice/singleclientinvoice/${id}`)
        return response?.data?.finddata
    }
)

const invoicelice = createSlice({
    name: "invoiceslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchinvoicedetails.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchinvoicedetails.fulfilled, (state, action) => {
            state.invoices = action.payload
            state.loading = false
        });
        builder.addCase(fetchinvoicedetails.rejected, (state, action) => {
            state.loading = false
        });
        // Single Invoices
        builder.addCase(fetchsingleinvoice.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchsingleinvoice.fulfilled, (state, action) => {
            state.singleinvoice = action.payload
            state.loading = false
        });
        builder.addCase(fetchsingleinvoice.rejected, (state, action) => {
            state.loading = false
        });
    }
})

export default invoicelice.reducer