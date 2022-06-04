import React, { useImperativeHandle } from "react"
import { Link } from "react-router-dom"

function DrawUserIcon({ username, id, fullname, active, from, i, teamname, showteamlead }) {
    var style = "px-1 pt-2 pb-3"
    if (active) {
        style += " active-user-list"
    }

    var teamlead = <div className="mb-3 pb-1"/>
    if(showteamlead && i == 0) {
        teamlead = <p className="text-bold mb-1">Тимлид</p>
    }
    return (<Link className="col-auto text-center" to={'/app/' + from + '/' + teamname + '/' + username}>
        <div className={style}>
            {teamlead}
            <img className="team-list-image mx-1 mb-2" src={"/assets/profiles/" + id + ".jpg"} width={55} height={55} />
            <p className="text-main mx-1 my-0">{fullname}</p>
        </div>
    </Link>)
}

export default function TeamList({ users, activeUser, from, showteamlead = false }) {
    const userList = users.map((user, i) => {
        var active = false
        if (user.username === activeUser) {
            active = true
        }
        return <DrawUserIcon key={user.username} fullname={user.fullname} active={active} username={user.username} from={from} id={user.id} i={i} showteamlead={showteamlead} teamname={user.teamname} />;
    });

    return (
        <div className="d-flex flex-row">
            {userList}
        </div>
    )
}