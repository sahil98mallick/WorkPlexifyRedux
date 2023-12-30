import { AxiosInstance } from "../../APIManager/AxiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    writers: [],
    loading: false
}

// Fetch users Clinets details by userID
export const fetchalluserwriters = createAsyncThunk(
    'allwriters',
    async (userid) => {
        const response = await AxiosInstance.get(`writers/writersbyuserid/${userid}`)
        return response?.data?.writerData
    }
)

const writerSlice = createSlice({
    name: "clientslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchalluserwriters.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchalluserwriters.fulfilled, (state, action) => {
            state.writers = action.payload
            state.loading = false
        });
        builder.addCase(fetchalluserwriters.rejected, (state, action) => {
            state.loading = false
        });
    }
})

export default writerSlice.reducer