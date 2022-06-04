import React from "react";
import TeamHeader from "./TeamHeader";
import TeamSideBar from "./TeamSideBar";
import { getOne, selectCurrentTeam } from "core/commands/commandsSlice"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function TeamTemplate(props) {
    const dispatch = useDispatch()
    var user = getOne(dispatch, "self", [], "", "undefined")

    const params = useParams()
    var activeTeam = params.teamname
    const team = useSelector(selectCurrentTeam)
    if (activeTeam == undefined) {
        activeTeam = team
    }


    return (<div style={{ width: "95vw" }}>
        <TeamHeader user={user.username} fullname={user.fullname} current={props.current} teamname={user.teamname} currentTeam={props.currentTeam} />
        <div className="d-flex flex-row">
            <div style={{ marginTop: 40 }}>
                <TeamSideBar />
            </div>
            <div className="pt-5" style={{ marginTop: 40, marginLeft: "190px", width: "100vw" }}>
                {props.children}
            </div>
        </div>
    </div>)
}