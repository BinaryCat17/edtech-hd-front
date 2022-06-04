import React from "react"
import { Link, useNavigate } from "react-router-dom";

const compColors = {
    "red": "#F472B6",
    "darkred": "#33CCFF",
    "DarkRed": "#33CCFF",
    "green": "#33CC99",
    "yellow": "#FDE68A",
    "blue": "#33CCFF",
    "darkblue": "#33CCFF",
    "darkgreen": "#33CC99",
    "Brown": "#33CCFF",
    "OrangeRed": "orange",
    "HotPink": "#F472B6"
}

function CompBox({ user, comp, filled = true, teamname }) {
    var style
    if (filled) {
        style = { color: "white" }
    } else {
        style = { color: "black" }
    }

    var backStyle
    if (filled) {
        backStyle = { background: compColors[comp.color], boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)", height: "50px", width: "215px" }
    } else {
        backStyle = { border: "3px solid " + compColors[comp.color], height: "50px", width: "215px" }
    }

    return (
        <Link to={"/app/team-view/" + teamname + "/" + user + "/" + comp.compname}>
            <div className="comp-button d-flex flex-row justify-content-center" style={backStyle}>
                <div className="align-self-center text-center">
                    <p className="mb-0 text-inter px-2" style={style}>{comp.compname}</p>
                </div>
            </div>
        </Link >
    )
}

export function CompColumn({ user, comps, selected, teamname }) {
    const column = comps.map((comp) => {
        if (comp.compname == selected) {
            return (<div className="pr-3 selected-background py-1 pl-1 mt-1" key={comp.compname}>
                <CompBox user={user} comp={comp} filled={true} teamname={teamname} />
            </div>)
        } else {
            return (<div className="mr-3 mt-2" key={comp.compname}>
                <CompBox user={user} comp={comp} filled={false} teamname={teamname} />
            </div>)
        }
    })

    return (<div>
        {column}
    </div>
    )
}

function DrawCompLevel({ user, comps, teamname }) {
    const compList = comps.map((comp) => {
        return (<div key={comp.compname} className="mr-2 align-self-center">
            <CompBox user={user} comp={comp} teamname={teamname} />
        </div>)
    });

    return (<div className="mt-0 d-flex flex-row">
        {compList}
    </div>)
}

export function CompetentionList({ user, comps, teamname }) {
    var res = [];
    var compList = [];
    let prevLevel = -1;

    console.log(comps)
    for (let i = 0; i < comps.length; i++) {
        const c = comps[i];
        if (prevLevel != c.currentlevel) {
            prevLevel = c.currentlevel
            res.push(<DrawCompLevel key={i} comps={compList} user={user} teamname={teamname} />)
            compList = []
            res.push(<p key={"level" + prevLevel} className="text-normal mb-0 mt-3">Уровень {prevLevel}</p>)
        }
        compList.push(c)
    }
    res.push(<DrawCompLevel key={comps.length} comps={compList} user={user} teamname={teamname} />)

    return (<div>
        {res}
    </div>)
}

