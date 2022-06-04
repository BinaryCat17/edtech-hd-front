import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCommandArgs, commandArgs } from "core/commands/commandsSlice"
import { Modal, Input } from "reactstrap"
import TeamTemplate from "../team/TeamTemplate"
import InputField from "core/input/InputField"
import { getOne } from "core/commands/commandsSlice"
import { useParams } from "react-router-dom"

function DrawUserLine({ user, iconSrc }) {
    return (
        <div className="d-flex mb-4 flex-row col-12 team-list-member">
            <img className="team-list-image mx-1 mb-2" src={"/assets/profiles/" + user.id + ".jpg"} width={45} height={45} />
            <p className="text-main align-self-center col-3 my-0">{user.fullname}</p>
            <p className="text-main align-self-center col-3 my-0">{user.team_role}</p>
            <p className="text-main align-self-center col-4 text-break my-0">{user.email}</p>
            <img className="align-self-center icon-button" src={iconSrc} width={20} height={20} />
        </div>
    )
}

function DrawUserList({ iconSrc, teamUsers }) {
    const userList = teamUsers.map((user) => {
        return <DrawUserLine key={user.username} user={user} iconSrc={iconSrc} />;
    });

    return (<div>
        <div className="d-flex flex-row col-12 ml-4">
            <p style={{ width: 30 }} />
            <p className="text-main col-3 mb-0">Full name</p>
            <p className="text-main col-3 mb-0">Role in team</p>
            <p className="text-main col-4 mb-0">Email address</p>
        </div>
        <div className="team-list-background pl-0">
            <div className="pt-4 col-12"></div>
            {userList}
        </div>
    </div>)
}

function ShareModal() {
    const [open, setOpen] = useState(false)

    return (<div>
        <div className="team-share-button align-self-center d-flex flex-row" onClick={() => setOpen(true)}>
            <p className="text-bold my-1 mx-2">Share</p>
            <img className="align-self-center mr-2" src="/assets/logo/adduser.png" width={20} height={20} />
        </div>
        <Modal isOpen={open}><div className="py-4 pl-4 pr-4">
            <div className="">
                <p className="text-title2 mt-3 mb-1 text-center">Пригласить участника</p>
                <InputField className="mx-4 mt-3"
                    placeholder="Почта участника"
                    name="email"
                    type="text"
                />
                <p className="text-title2 mt-3 mb-1 text-center">или:</p>
                <div className="mx-4 mb-3 mt-3">
                    <Input className={"m-0 p-3"}
                        type={"link"}
                        value={"https://kakayatokilnk.com/dreamteam"}
                    />
                </div>
                <div className="login-button mx-4 mb-4 d-flex flex-row pt-2 m-0">
                    <img src="/assets/logo/lock.png" className="ml-1 mr-5" width={30} height={25} />
                    <p className="text-normal-light mt-1 mb-2 ml-5 mr-5 text-center col-4">Войти</p>
                </div>
            </div>
            <div style={{ position: "absolute", left: "450px", top: "4px" }}>
                <div className="d-flex flex-row">
                    <div className="mr-auto"></div>
                    <div className="icon-button mr-2" onClick={() => setOpen(false)}>
                        <img src="/assets/logo/exit.png" className="align-self-start" width={40} height={40} />
                    </div>
                </div>
            </div>
        </div></Modal>
    </div>)
}

export default function TeamEditPage(_) {
    const dispatch = useDispatch()
    var defuser = getOne(dispatch, "self", [], "", "undefined")

    const params = useParams()
    var activeTeam = params.teamname
    if (activeTeam == undefined) {
        activeTeam = defuser.teamname
    }
    var activeUser = params.username
    if (activeUser == undefined) {
        activeUser = defuser.username
    }

    var users = useSelector(selectCommandArgs("team-user-info", [activeTeam]))
    useEffect(() => {
        dispatch(commandArgs("GET", "team-user-info", [activeTeam]))
    }, [activeTeam])

    return (<TeamTemplate current="Редактирование команды" currentTeam={activeTeam}>
        <div className="d-flex flex-row justify-content-between">
            <p className="text-title">{activeTeam}</p>
            <ShareModal />
        </div>
        <DrawUserList iconSrc="/assets/logo/trash.png" teamUsers={users}/>
        <p className="text-title mt-5 pt-5 ml-3">История</p>
        <DrawUserList iconSrc="/assets/logo/up.png" teamUsers={users}/>
    </TeamTemplate>)
}