import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCommand, command, selectCommandArgs, commandArgs } from "core/commands/commandsSlice"
import TeamList from "./TeamList"
import { useParams } from "react-router-dom"
import { CompetentionModal } from "./CompetentionModal"
import { UserInfo } from "./UserInfo"
import TeamTemplate from "../team/TeamTemplate"
import { getOne } from "core/commands/commandsSlice"

export default function TeamViewPage() {
    const dispatch = useDispatch()
    var defuser = getOne(dispatch, "self", [], "", "undefined")

    const params = useParams()
    var activeTeam = params.teamname
    if (activeTeam == undefined) {
        activeTeam = defuser.teamname
    }

    useEffect(() => {
        dispatch(commandArgs("GET", "team-user-info", [activeTeam]))
        dispatch(command("GET", "user-attach", []))
        dispatch(command("GET", "user-comps", []))
        dispatch(command("GET", "user-comp-checks", []))
    }, [activeTeam])

    var attachs = useSelector(selectCommand("user-attach"))
    var comps = useSelector(selectCommand("user-comps"))
    var compChecks = useSelector(selectCommand("user-comp-checks"))

    var users = useSelector(selectCommandArgs("team-user-info", [activeTeam]))

    var activeUser = params.username
    if (activeUser == undefined) {
        if (activeTeam != undefined && users != undefined && users.length > 0) {
            activeUser = users[0].username
        } else {
            activeUser = defuser.username
        }
    }

    const activeComp = params.competention
    var activeLevel = params.level

    var user = users.find((user) => user.username == activeUser)
    var userInfo = <div><p className="text-title2">Участник не выбран</p></div>

    if (user != undefined && comps.length != 0) {
        attachs = attachs.filter(attach => attach.username == user.username)
        comps = comps.filter(comp => comp.username == user.username)
        compChecks = compChecks.filter(check => check.username == user.username)

        var modal = <div />
        if (activeComp != undefined) {
            modal = <CompetentionModal user={user.username} teamname={user.teamname} comps={comps} checks={compChecks} level={activeLevel} selected={activeComp} />
        }

        userInfo = <div>
            <UserInfo user={user} compChecks={compChecks} comps={comps} attachs={attachs} />
            {modal}
        </div>
    }

    if (user == undefined) {
        user = { username: 'undefined', fullname: 'undefined' }
    }

    return (<TeamTemplate current="Информация о участниках" currentTeam={activeTeam}>
        <p className="text-title2">Участники</p>
        <TeamList users={users} activeUser={activeUser} from="team-view" showteamlead={true} />
        <hr className="mb-5" />
        {userInfo}
        <div className="mt-5" />
    </TeamTemplate>)
}