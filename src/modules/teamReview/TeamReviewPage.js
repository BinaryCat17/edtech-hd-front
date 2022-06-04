import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCommand, selectCommandArgs, command, commandArgs } from "core/commands/commandsSlice"
import TeamList from "../teamView/TeamList"
import { useParams } from "react-router-dom"
import TeamTemplate from "../team/TeamTemplate"
import ChartBar from "../charts/Chart"
import { getOne } from "core/commands/commandsSlice"

const Mark = ({ num, what }) => {
    return (<div className="d-flex flex-row">
        <div className="feedback-mark mr-3 text-center text-bold">
            {Number((num).toFixed(1))}
        </div>
        <p className="text-title2 align-self-center mb-0">{what}</p>
    </div>)
}

export default function TeamReviewPage() {
    const dispatch = useDispatch()
    const params = useParams()

    var defuser = getOne(dispatch, "self", [], "", "undefined")


    var activeTeam = params.teamname
    if (activeTeam == undefined) {
        activeTeam = defuser.teamname
    }

    useEffect(() => {
        dispatch(commandArgs("GET", "team-user-info", [activeTeam]))
        dispatch(command("GET", "user-info", []))
    }, [activeTeam])

    var users = useSelector(selectCommandArgs("team-user-info", [activeTeam]))

    var activeUser = params.username
    if (activeUser == undefined) {
        if (activeTeam != undefined && users != undefined && users.length > 0) {
            activeUser = users[0].username
        } else {
            activeUser = defuser.username
        }
    }

    const viewUser = params.viewuser

    var user = users.find((user) => user.username === activeUser)

    useEffect(() => {
        if (user != undefined) {
            dispatch(commandArgs("GET", "user-review", [user.username]))
        }
    }, [user])

    var userReview = useSelector(selectCommandArgs("user-review", [user?.username]))
    var userInfo = <div><p className="text-title2">Участник не выбран</p></div>

    if (user != undefined) {
        var feedback = <div />
        var userFeedback = userReview.find((user) => user.fromname === viewUser)

        var averageMark = 0
        userReview.forEach(r => {
            averageMark = averageMark + r.mark + r.teammark
        });
        averageMark = averageMark / (userReview.length * 2);

        if (userFeedback) {
            feedback = <div className="mt-3 ml-3">
                <Mark num={userFeedback.mark} what={'Оценка эффективности'} />
                <p className="text-main mb-0 mt-2">{userFeedback.comment}</p>
                <div className="mt-3" />
                <Mark num={userFeedback.teammark} what={'Оценка командной работы'} />
                <p className="text-main mb-0 mt-2">{userFeedback.teamcomment}</p>
            </div>
        }

        const otherUsers = users.filter((user) => userReview.find(r => r.fromname == user.username) != undefined)
        userInfo = <div>
            <div className="col-8 mt-4 p-0 d-flex flex-row col-12">
                <div className="col-6">
                    <p className="text-title2">Выполнение задач по спринтам</p>
                    <ChartBar />
                </div>
                <div className="col-6">
                    <Mark num={averageMark} what={'Общая оценка командой'} />
                    <div className="mt-3" />
                    <TeamList users={otherUsers} activeUser={viewUser} from={"team-review/" + activeTeam + "/" + activeUser} />
                    {feedback}
                </div>
            </div>
        </div>
    }

    return (<TeamTemplate current="Оценка участников" currentTeam={activeTeam}>
        <p className="text-title2">Участники</p>
        <TeamList users={users} activeUser={activeUser} from="team-review" showteamlead={true} />
        <hr className="mb-0" />
        {userInfo}
        <div className="mt-5" />
    </TeamTemplate>)
}