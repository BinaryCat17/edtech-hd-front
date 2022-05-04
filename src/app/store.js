import { configureStore } from '@reduxjs/toolkit'
import personsSlice from "modules/staff/personsSlice"
import commentsSlice from "modules/staff/commentsSlice"

export default configureStore({
    reducer: {
        persons: personsSlice,
        comments: commentsSlice
    }
})