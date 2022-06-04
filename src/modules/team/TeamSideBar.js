import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectCommand, command, getOne, currentTeam } from "core/commands/commandsSlice"
import { useDispatch, useSelector } from "react-redux"

function TeamLink({ text, active = false, handleClick }) {
    var style
    if (active) {
        style = { background: "#E0F2FE" }
    } else {
        style = { background: "#FFFFFF" }
    }

    return (
        <div className="mr-3 py-2 col-12 pl-0" onClick={() => handleClick(text)}>
            <a href={"/app/team-view/" + text}>
                <p className="mb-0 text-inter team-selected col-12 p-0 ml-3" style={style}>
                    {text}
                </p>
            </a>
        </div>
    )
}

export default function TeamSideBar({ current }) {
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        dispatch(command("GET", "teams", []))
    }, [])

    var defuser = getOne(dispatch, "self", [], "", "undefined")

    var activeTeam = params.teamname
    if (activeTeam == undefined) {
        activeTeam = defuser.teamname
    }

    function handleTeamSwitch(team) {
        dispatch(currentTeam(team))
    }

    const teamUsers = useSelector(selectCommand("teams"))
    const teamList = teamUsers.map((team, i) => {
        return (<TeamLink key={i} text={team.teamname} active={team.teamname == activeTeam} handleClick={handleTeamSwitch} />)
    })

    return (
        <div className="fixed-top d-flex flex-row sidebar" style={{ width: "160px", marginTop: "80px" }}>
            <div className="col-2 sidebar-team-background mr-3 col-11" style={{ width: "160px" }}>
                <p className="text-title2 mt-2 mb-1">Команды</p>
                {teamList}
            </div>
            <div className="vertical-line" style={{ marginTop: "20px", height: "100vh" }} />
        </div>
    )
}