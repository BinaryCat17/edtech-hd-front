import React from "react"

function DrawAttach({ username, filename }) {
    return (<div className="attach-box d-flex flex-row">
        <img className="ml-2 my-1" src="/assets/logo/link.png" width={20} height={20} />
        <p className="text-main ml-2 mb-0 mr-auto align-self-center">{filename}</p>
        <a className="link-normal mr-2 align-self-center" href={"http://чёрныйящик.рф/api/get-file/" + username + "/" + filename}>Download</a>
    </div>)
}

export function AttachmentList({ username, attachs }) {
    const attachList = attachs.filter((attach) => attach.username == username).map((attach) => {
        return <DrawAttach key={attach.file} filename={attach.file} username={username} />;
    });

    if (attachList.length === 0) {
        return <div></div>
    }

    return (<div className="d-flex flex-row">
        <p className="text-gray col-4">Вложения</p>
        <div className="col-8">
            {attachList}
        </div>
    </div>)
}