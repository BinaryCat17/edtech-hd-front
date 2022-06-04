import React from "react"
import { AttachmentList } from "./AttachmentList"
import { CompetentionList } from "./CompetentionList"

function DrawInfoField({ title, value }) {
    return (<div className="d-flex flex-row">
        <p className="text-gray col-4">{title}</p>
        <p className="text-main col-8">{value}</p>
    </div>)
}

export function UserInfo({ user, attachs, comps }) {
    return (<div>
        <div className="d-flex flex-row">
            <div className="col-5 p-0">
                <p className="text-title2">Информация об участнике</p>
                <DrawInfoField title="Имя" value={user.fullname} />
                <DrawInfoField title="Роль в команде" value={user.team_role} />
                <DrawInfoField title="Электронная почта" value={user.email} />
                <DrawInfoField title="Комментарий" value={user.about} />
                <AttachmentList username={user.username} attachs={attachs} />
            </div>
            <div className="ml-5 col-6">
                <CompetentionList user={user.username} teamname={user.teamname} comps={comps} />
            </div>
        </div>
    </div>
    )
}