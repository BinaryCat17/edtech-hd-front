import { configureStore } from '@reduxjs/toolkit'
import commandsSlice from "core/commands/commandsSlice"

export default configureStore({
    reducer: {
        commands: commandsSlice
    }
})