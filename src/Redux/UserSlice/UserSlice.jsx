import { AxiosInstance } from "../../APIManager/AxiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    singleusers: {},
    loading: false
}

// Fetch users Clinets details by userID
export const fetchsingleusers = createAsyncThunk(
    'singleuser',
    async (userid) => {
        const response = await AxiosInstance.get(`users/singleuser/${userid}`)
        return response?.data?.finddata
    }
)

const userSlice = createSlice({
    name: "clientslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchsingleusers.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchsingleusers.fulfilled, (state, action) => {
            state.singleusers = action.payload
            state.loading = false
        });
        builder.addCase(fetchsingleusers.rejected, (state, action) => {
            state.loading = false
        });
    }
})

export default userSlice.reducer