import React from "react";
import TeamTemplate from "../team/TeamTemplate";
import Kanban from "./Kanban";
import { useDispatch } from "react-redux"
import { getOne } from "core/commands/commandsSlice"
import { useParams } from "react-router-dom"

export default function KanbanPage() {
    const dispatch = useDispatch()
    var defuser = getOne(dispatch, "self", [], "", "undefined")

    const params = useParams()
    var activeTeam = params.teamname
    if (activeTeam == undefined) {
        activeTeam = defuser.teamname
    }

    return (<TeamTemplate className="m-5" current="Канбан" currentTeam={activeTeam}>
        <div className="kanban-background">
            <Kanban team={activeTeam}/>
        </div>
    </TeamTemplate>)
}