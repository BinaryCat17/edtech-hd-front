import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { commandUpdateArgs, command, getOne } from "core/commands/commandsSlice"
import { TimeMessage } from "core/utils/TimeMessage"
import TextareaAutosize from 'react-textarea-autosize';

export const Comment = ({ title, commandName, args }) => {
    const [saveVisible, setSaveVisible] = useState(false)
    const dispatch = useDispatch()
    var comment = getOne(dispatch, commandName, args, "comment", "")

    function updateValue(e) {
        dispatch(commandUpdateArgs(commandName, args, e.target.value))
    }

    function saveValue() {
        dispatch(command("POST", commandName, args, comment))
        setSaveVisible(true)
    }

    return (<div>
        <hr className="mt-0 mb-0 mt-2" />
        <p className="text-bold-gray mb-0">{title}</p>
        <div className="d-flex flex-row">
            <TextareaAutosize minRows={7} placeholder="Комментарий" className="comment col-11 pl-2" value={comment} onChange={(e) => updateValue(e)} />
            <div className="icon-button align-self-center" onClick={saveValue}>
                <img src="/assets/logo/edit.png" className="align-self-center mb-1" width={20} height={20} />
            </div>
        </div>
        <hr className="mt-0 mb-0 ml-2"/>
        <div className="d-flex flex-row mb-2">
            <div className="mr-auto" />
            <div className="mr-2"><TimeMessage onExpired={() => setSaveVisible(false)} enabled={saveVisible}><p className="text-normal mb-0">Комментарий сохранён</p></TimeMessage></div>
        </div>
    </div>)
}