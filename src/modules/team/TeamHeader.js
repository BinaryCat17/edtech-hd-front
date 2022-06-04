import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentTeam } from "core/commands/commandsSlice"

function TeamLink({ to, text, active }) {
    var style
    if (active != text) {
        style = { background: "#7DD3FC" }
    } else {
        style = { background: "#FFFFFF" }
    }

    

    return (
        <div className="header-team-page mt-auto mr-3 py-2 px-2 col-2 text-center" style={style}>
            <Link to={to}>
                <p className="mb-0 text-main">
                    {text}
                </p>
            </Link>
        </div>
    )
}

export default function TeamHeader({ current, teamname, currentTeam, user, fullname }) {

    return (<div className="col-12 fixed-top header-team-background">
        <a href="/home"><img className="mb-0 pb-0 pt-1" style={{ position: "absolute", top: "7px" }} src="/assets/logo/brand.svg" width="200" height="60" /></a>
        <a href={"/app/team-view/" + teamname + "/" + user}><img className="mb-0 pb-0 pt-1" style={{ position: "absolute", top: "4px", right: "10px" }} src="/assets/logo/profile.png" width="50" height="50" /></a>
        <a href={"/app/team-view/" + teamname + "/" + user}><p className="mb-0 pb-0 pt-1 link-big" style={{ position: "absolute", top: "15px", right: "75px" }}>{fullname}</p></a>
        <div className="d-flex flex-row justify-content-center" style={{ height: 60 }}>
            <TeamLink to={"/app/team-view/"+currentTeam} text="Информация о участниках" active={current} />
            <TeamLink to={"/app/team-review/"+currentTeam} text="Оценка участников" active={current} />
            <TeamLink to={"/app/team-edit/"+currentTeam} text="Редактирование команды" active={current} />
            <TeamLink to={"/app/kanban/"+currentTeam} text="Канбан" active={current} />
        </div>
    </div>)
}