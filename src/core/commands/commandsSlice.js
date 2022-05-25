import { createSlice } from "@reduxjs/toolkit"
import {sendCommand, sendLogin} from "./sendCommand"

const reducers = {
    authorized(state, action) {
        state.auth.username = action.payload.username
        state.auth.password = action.payload.password
        state.auth.access = action.payload.access
    },
    commanded(state, action) {
        state[action.payload.name] = action.payload.result
    }
}

const initialState = {
    auth: {
        username: null,
        password: null,
        access: 'none',
    }
}

const authorizationSlice = createSlice({
    name: "commands",
    initialState,
    reducers
})

export const authorize = (username, password) => dispatch => {
    sendLogin(username, password, json => {
        if (json.length > 0) {
            dispatch(authorized({ username: username, password: password, access: json[0].access }))
        } else {
            dispatch(authorized({ username: "", password: "", access: "unauthorized" }))
        }
    })
}

export const command = (method, command, args) => (dispatch) => {
    sendCommand(method, command, args, json => {
            dispatch(commanded({ name: command, result: json }))
        })
}

export const selectCommand = command => state => {
    if (state.commands[command] !== undefined) {
        if(state.commands[command].error !== undefined) {
            return []
        } else {
            return state.commands[command]
        }
    } else {
        return []
    }
}

export const selectLogin = state => (
    state.commands.auth
)

export const { authorized, commanded } = authorizationSlice.actions
export default authorizationSlice.reducer