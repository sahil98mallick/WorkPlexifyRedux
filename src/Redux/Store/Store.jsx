import AdminSlice from "../AdminPortal/AdminSlice";
import ClientSlice from "../ClientSlice/ClientSlice";
import InvoiceSlice from "../InvoiceSlice/InvoiceSlice";
import TaskSlice from "../TaskSlice/TaskSlice";
import UserSlice from "../UserSlice/UserSlice";
import WriterSlice from "../WriterSlice/WriterSlice";
const { configureStore } = require("@reduxjs/toolkit");

export const Store = configureStore({
    reducer: {
        client: ClientSlice,
        writer: WriterSlice,
        user: UserSlice,
        task: TaskSlice,
        invoice: InvoiceSlice,
        admin: AdminSlice,
    }
})