import { AxiosInstance } from "../../APIManager/AxiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    clients: [],
    loading: false
}

// Fetch users Clinets details by userID
export const fetchalluserclients = createAsyncThunk(
    'allclinets',
    async (userid) => {
        const response = await AxiosInstance.get(`clients/clientsbyuserid/${userid}`)
        return response?.data?.clientData
    }
)

const clientSlice = createSlice({
    name: "clientslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchalluserclients.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchalluserclients.fulfilled, (state, action) => {
            state.clients = action.payload
            state.loading = false
        });
        builder.addCase(fetchalluserclients.rejected, (state, action) => {
            state.loading = false
        });
    }
})

export default clientSlice.reducer