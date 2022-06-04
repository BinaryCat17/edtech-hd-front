import { createSlice } from "@reduxjs/toolkit"
import { sendCommand, sendLogin } from "./sendCommand"
import { useEffect, useState } from "react"
import { ReactReduxContext, useSelector } from "react-redux";

const reducers = {
    authorized(state, action) {
        state.auth.username = action.payload.username
        state.auth.password = action.payload.password
        state.auth.access = action.payload.access
    },
    commanded(state, action) {
        state[action.payload.name] = action.payload.result
    },
    update(state, command, callback) {
        callback(state[command])
    },
    currentTeam(state, action) {
        state.team = action.payload
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


export const selectCurrentTeam = state => {
    return state.team
}

export const authorize = (username, password) => dispatch => {
    sendLogin(username, password, json => {
        if (json.length > 0) {
            dispatch(authorized({ username: username, password: password, access: json[0].access }))
        } else {
            dispatch(authorized({ username: "", password: "", access: "unauthorized" }))
        }
    })
}

export const command = (method, command, args, payload = null) => (dispatch) => {
    sendCommand(method, command, args, json => {
        dispatch(commanded({ name: command, result: json }))
    }, payload)
}

export const commandUpdate = (command, result) => (dispatch) => {
    dispatch(commanded({ name: command, result: result }))
}

export const commandUpdateArgs = (command, args, result) => (dispatch) => {
    var argsName = command
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        argsName += "-" + arg
    }
    dispatch(commanded({ name: argsName, result: result }))
}

export const commandArgs = (method, command, args, payload = null) => (dispatch) => {
    var argsName = command
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        argsName += "-" + arg
    }
    sendCommand(method, command, args, json => {
        dispatch(commanded({ name: argsName, result: json }))
    }, payload)
}


export const selectCommand = command => state => {
    if (state.commands[command] !== undefined) {
        if (state.commands[command].error !== undefined) {
            return []
        } else {
            return state.commands[command]
        }
    } else {
        return []
    }
}

export const selectCommandArgs = (command, args) => state => {
    var argsName = command
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        argsName += "-" + arg
    }
    if (state.commands[argsName] !== undefined) {
        if (state.commands[argsName].error !== undefined) {
            return []
        } else {
            return state.commands[argsName]
        }
    } else {
        return []
    }
}

export const selectCommandArgsAll = (command, args, column = "") => state => {
    var argsName = command
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        argsName += "-" + arg
    }

    var result = []
    for (var cmd in state.commands) {
        if (cmd.startsWith(argsName)) {
            var value = state.commands[cmd]
            if (column.length > 0 && Array.isArray(value) && value[0] != undefined) {
                value = value[0][column];
            }
            const ex = cmd.replace(argsName, '')
            result.push([value].concat(ex.split('-').slice(1)))
        }
    }
    return result
}

export const getOne = (dispatch, command, args, column = "", init, cache = null) => {
    var status = useSelector(selectCommandArgs(command, args));
    useEffect(() => {
        if (cache != null || status == init) {
            dispatch(commandArgs("GET", command, args))
        }
    }, args.concat(cache))

    if (status.length == 0) {
        status = init
    }

    if (Array.isArray(status) && status[0] != undefined) {
        if (column != "") {
            status = status[0][column];
        } else {
            status = status[0];
        }
    }

    return status
}

export const selectLogin = state => (
    state.commands.auth
)

export const { authorized, commanded, update, currentTeam } = authorizationSlice.actions
export default authorizationSlice.reducer