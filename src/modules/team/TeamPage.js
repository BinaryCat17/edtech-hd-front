import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "reactstrap"
import { selectCommand, command } from "core/commands/commandsSlice"

function DrawUserLine({ user, iconSrc }) {
    return (
        <div className="d-flex mb-4 flex-row col-12 team-list-member">
            <img className="team-list-image" src="/assets/users/profile.jpg" width={30} height={30} />
            <p className="text-normal align-self-center col-3 my-0">{user.fullname}</p>
            <p className="text-normal align-self-center col-3 my-0">{user.team_role}</p>
            <p className="text-normal align-self-center col-4 text-break my-0">{user.email}</p>
            <img className="align-self-center" src={iconSrc} width={20} height={20} />
        </div>
    )
}

function DrawUserList({ cmdName, iconSrc }) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(command("GET", cmdName, ["Оценщики"]))
    }, [])

    const teamUsers = useSelector(selectCommand(cmdName))
    const userList = teamUsers.map((user) => {
        return <DrawUserLine key={user.username} user={user} iconSrc={iconSrc} />;
    });

    return (<div>
        <div className="d-flex flex-row col-xxl-6 col-xl-8 col-md-9 col-sm-10">
            <p style={{ width: 30 }} />
            <p className="text-normal col-3 mb-0">Full name</p>
            <p className="text-normal col-3 mb-0">Role in team</p>
            <p className="text-normal col-4 mb-0">Email address</p>
        </div>
        <div className="team-list-background col-xxl-6 col-xl-8 col-md-9 col-sm-10 pl-0">
            <div className="pt-4 col-12"></div>
            {userList}
        </div>
    </div>)
}

export default function TeamPage(_) {
    return (<Container className="col-xxl-8 col-xl-12 col-md-12 m-0 p-0 min-vw-100">
        <div className="d-flex flex-row justify-content-between col-xxl-6 col-xl-8 col-md-9 col-sm-10">
            <p className="text-title">Телепузики team</p>
            <div className="team-share-button align-self-center d-flex flex-row">
                <p className="text-bold my-1 mx-2">Share</p>
                <img className="align-self-center mr-2" src="/assets/logo/trash.png" width={20} height={20} />
            </div>
        </div>
        <DrawUserList cmdName="team-users" iconSrc="/assets/logo/trash.png" />
        <p className="text-title mt-5 pt-5 ml-3">Архив</p>
        <DrawUserList cmdName="team-users" iconSrc="/assets/logo/trash.png" />
    </Container>)
}