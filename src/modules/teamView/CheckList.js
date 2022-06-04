import React from "react"
import { useDispatch } from "react-redux";
import { commandUpdateArgs, command, getOne } from "core/commands/commandsSlice"

function CompCheckButton({ check }) {
    const dispatch = useDispatch()
    const args = [check.username, check.compname, check.checkname];
    var status = getOne(dispatch, "comp-status", args, "status", "undefined")

    var logo;
    var color = "black"
    if (status == "unknown" || status == "undefined") {
        logo = <img src="/assets/logo/check.png" width={25} height={25} style={{ filter: "grayscale(100%)" }} />
    } else if (status == "insufficient") {
        logo = <img src="/assets/logo/not.png" width={20} height={20} />
        color = "red"
    } else {
        logo = <img src="/assets/logo/check.png" width={25} height={25} />
        color = "green"
    }

    function updateStatus(status, create = false) {
        if (create) {
            dispatch(command("POST", "comp-check", args.concat([status])))
        } else {
            dispatch(command("POST", "comp-status", args.concat([status])))
        }
        dispatch(commandUpdateArgs("comp-status", args, status))
    }

    function autoStatus() {
        var create = (status == "undefined") ? true : false

        if (check.votes >= check.maxvotes) {
            updateStatus("complete", create)
        } else if (check.votes > 0) {
            updateStatus("unknown", create)
        } else {
            updateStatus("insufficient", create)
        }
    }

    function changeStatus() {
        if (status == "unknown") {
            updateStatus("complete", false)
        } else if (status == "insufficient") {
            updateStatus("complete", false)
        } else if (status == "complete") {
            updateStatus("unknown", false)
        } else if (status == "undefined") {
            updateStatus("complete", true)
        }
    }

    return (
        <div className="col-auto text-center mt-1 ml-4 align-self-center">
            <div style={{ fontSize: 0 }} className="icon-button" onClick={changeStatus}>
                {logo}
            </div>
            <p className="text-mini mt-1 mb-0 icon-button" style={{ color: color }} onClick={autoStatus}>
                {check.votes} / {check.maxvotes}
            </p>
        </div>
    )
}

function CompCheck({ check }) {
    return (<div className="comp-check d-flex flex-row mt-2">
        <div className="col-10 px-2 py-1 mr-2">
            <p className="text-bold mb-0 mr-2"> {check.checkname} </p>
            <p className="text-inter mb-1 mr-2 ml-1"> {check.description} </p>
        </div>
        <CompCheckButton check={check} />
    </div>)
}


export function CheckList({ levelChecks }) {
    const checkList = levelChecks.map((check) => {
        return (<CompCheck key={check.checkname} check={check} />)
    })

    return (<div>
        {checkList}
    </div>)
}