import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { commandUpdateArgs, command, getOne, selectCommandArgsAll } from "core/commands/commandsSlice"
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import { CompColumn } from "./CompetentionList"
import { CheckList } from "./CheckList"
import { Comment } from "core/utils/Comment"
import { useNavigate } from "react-router-dom";
import { TimeMessage } from "core/utils/TimeMessage"

function CompSelect({ user, comp, level }) {
    const navigate = useNavigate();

    function handleSelectUp() {
        navigate("/app/team-view/" + user + "/" + comp.compname + "/" + (Number(level) + 1))
    }

    function handleSelectDown() {
        navigate("/app/team-view/" + user + "/" + comp.compname + "/" + (Number(level) - 1))
    }

    if (Number(level) >= comp.levelcount) {
        return (<div className="d-flex flex-row">
            <div style={{ width: 18 }} />
            <img src="/assets/logo/down.png" className="align-self-center ml-2 icon-button" width={20} height={20} onClick={handleSelectDown} />
        </div>)
    } else if (Number(level) <= 1) {
        return (<div className="d-flex flex-row">
            <img src="/assets/logo/up.png" className="align-self-center ml-2 icon-button" width={18} height={18} onClick={handleSelectUp} />
            <div style={{ width: 18 }} />
        </div>)

    } else {
        return (<div className="d-flex flex-row">
            <img src="/assets/logo/up.png" className="align-self-center ml-2 icon-button" width={18} height={18} onClick={handleSelectUp} />
            <img src="/assets/logo/down.png" className="align-self-center ml-2 icon-button" width={20} height={20} onClick={handleSelectDown} />
        </div>)
    }
}

function levelUp(dispatch, comp, currentlevel, level) {
    if (currentlevel < comp.levelcount) {
        const nextLevel = (Number(level))
        dispatch(nextLevel)
        return "доступно повышение"
    } else {
        return "уровень максимальный"
    }
}

function levelDown(dispatch, comp, currentlevel, level) {
    if (currentlevel > 0) {
        const nextLevel = (Number(level) - 1)
        dispatch(nextLevel)
        return "следует понизить"
    } else {
        return "ниже некуда"
    }
}

function processLevel(dispatch, comp, currentlevel, completedCount, totalCount, level) {
    var text = "undefined"
    if (completedCount == totalCount) {
        if (level <= currentlevel) {
            text = "Уровень повышен, проверьте следующие уровни."
        } else if (level == currentlevel + 1) {
            text = levelUp(dispatch, comp, currentlevel, level)
        } else {
            text = "Невозможно повысить уровень, потому что предыдущие уровни не завершены."
        }
    } else if (completedCount > 0) {
        if (level <= currentlevel) {
            text = levelDown(dispatch, comp, currentlevel, level)
        } else if (level == currentlevel + 1) {
            levelDown(dispatch, comp, currentlevel, level)
            text = "Уровень сотрудника понижен, потому что просматриваемый вами уровень больше не завершён."
        } else {
            text = "Невозможно повысить уровень, потому что предыдущие уровни еще не завершены."
        }
    } else {
        if (level <= currentlevel) {
            text = levelDown(dispatch, comp, currentlevel, level)
        } else if (level == currentlevel + 1) {
            text = "Уровень сотрудника понижен, потому что просматриваемый вами уровень больше не завершён."
        } else {
            text = "Уровень еще не изучен."
        }
    }
    return text
}


function LevelStatus({ comp, levelChecks, level, currentlevel, levelUpdate, compStatus }) {
    var color = "black"
    const [text, setText] = useState("undefined")
    const [saveVisible, setSaveVisible] = useState(false)
    const [lastLevel, setLastLevel] = useState()

    useEffect(() => {
        if (levelChecks.length > 0) {
            const checkStatus = compStatus.filter((status) => levelChecks.find(check => check.checkname == status[1]) != undefined)
            if (checkStatus.length == levelChecks.length) {
                const completedCount = checkStatus.filter(status => status[0] == "complete").length
                const msg = processLevel(levelUpdate, comp, currentlevel, completedCount, levelChecks.length, level)
                if (currentlevel != lastLevel || msg.startsWith('Невозможно')) {
                    setLastLevel(currentlevel)
                    if (lastLevel != undefined) {
                        setText(msg)
                        setSaveVisible(true)
                    }
                }
            }
        }
    }, [levelChecks])

    var status = <p className="text-bold-gray mb-0" style={{ color: "red" }}>Уровень не изучен</p>
    if (level < currentlevel) {
        status = <p className="text-bold-gray mb-0" style={{ color: "green" }}>Уровень изучен</p>
    } else if (level == currentlevel) {
        status = <p className="text-bold-gray mb-0" style={{ color: "blue" }}>Уровень изучается</p>
    }

    return (<TimeMessage onExpired={() => setSaveVisible(false)} enabled={saveVisible}>
        <div className="p-0 green-box pb-1">
            <p className="text-bold-gray ml-2 mb-0 mt-1 text-bold-gray" style={{ color: color }}>{text}</p>
        </div>
    </TimeMessage>)
}

function LevelIndicator({ comp, levelcount, currentlevel, level, teamname }) {
    var list = []
    var style = { borderRadius: "50%", border: "2px solid #7B7B7B", width: 20, height: 20 }
    for (let i = 0; i < levelcount; i++) {
        if (i < currentlevel) {
            style.background = "#33CC99"
        } else {
            style.background = "none"
        }

        if (level == i + 1) {
            list.push(<div key={i} className="mr-1" >
                <img src="/assets/logo/down.png" style={{ display: "block", marginLeft: "5px" }} width={10} height={10} />
                <div key={i} style={structuredClone(style)} />
            </div>)
        } else {
            list.push(
                <Link key={i} to={"/app/team-view/" + teamname + "/" + comp.username + "/" + comp.compname + "/" + (i + 1)}>
                    <div className="mt-2" />
                    <div className="mr-1" style={structuredClone(style)} />
                </Link>)
        }
    }

    return (<div className="d-flex flex-row align-self-center">
        {list}
    </div>)
}

export function CompetentionModal({ user, teamname, checks, comps, selected, level }) {
    const comp = comps.find(comp => comp.compname == selected)

    const dispatch = useDispatch()
    var currentlevel = getOne(dispatch, "comp-level", [comp.username, comp.compname], "currentlevel", 0)
    if (level == undefined) {
        level = Math.min(currentlevel + 1, comp.levelcount)
    }

    const compChecks = checks.filter((check) => check.compname == comp.compname);
    const levelChecks = compChecks.filter((check) => check.level == level);
    const compStatus = useSelector(selectCommandArgsAll("comp-status", [comp.username, comp.compname], "status"))

    function levelUpdate(nextLevel) {
        dispatch(command("POST", "comp-level", [comp.username, comp.compname, nextLevel]))
        dispatch(commandUpdateArgs("comp-level", [comp.username, comp.compname], nextLevel))
    }

    return (
        <Modal isOpen={true} size="lg"><div className="py-4 pl-4 pr-4">
            <div className="d-flex flex-row">
                <div>
                    <div className="col-11 d-flex flex-row p-0 mt-1 mb-1">
                        <p className="text-bold-gray mb-2 col-10 p-0 align-self-center">Компетенции</p>
                        <img src="/assets/logo/edit.png" className="align-self-center ml-2 mb-2" width={18} height={18} />
                    </div>
                    <CompColumn user={user} comps={comps} selected={selected} teamname={teamname} />
                </div>
                <div className="vertical-line mr-0" />
                <div className="col-9 pt-0 pr-5">
                    <LevelIndicator comp={comp} levelcount={comp.levelcount} currentlevel={currentlevel} level={level} teamname={teamname} />
                    <p className="text-bold mb-0 mr-2"> Описание компетенции </p>
                    <p className="comp-desc mb-2 p-2 text-main">{comp.description}</p>
                    <CheckList user={user} comp={comp} levelChecks={levelChecks} currentlevel={currentlevel} level={level} />
                    <LevelStatus comp={comp} levelChecks={levelChecks} currentlevel={currentlevel} level={level} levelUpdate={levelUpdate} compStatus={compStatus} />
                    <Comment commandName="comp-comment" title="Комментарий к компетенции сотрудника:" args={[user, comp.compname]} />
                </div>
            </div>
            <div style={{ position: "absolute", left: "750px", top: "4px" }}>
                <div className="d-flex flex-row">
                    <div className="mr-auto"></div>
                    <a href={"/app/team-view/" + teamname + '/' + user}>
                        <div className="icon-button mr-2">
                            <img src="/assets/logo/exit.png" className="align-self-start" width={40} height={40} />
                        </div>
                    </a>
                </div>
            </div>
        </div></Modal >
    )
}