import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap"
import InputField from "core/input/InputField"
import { authorize, command, selectCommand, getOne } from "core/commands/commandsSlice";
import LoginTemplate from "./LoginTemplate";
import { Link, useParams } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';

export default function SignUpPage(_) {
    const [username, setUsername] = useState(["", ""])
    const [email, setEmail] = useState(["", ""])
    const [password, setPassword] = useState(["", ""])
    const [newPassword, setNewPassword] = useState(["", ""])
    const [name, setName] = useState(["", ""])
    const [access, setAccess] = useState("Тимлид")
    const [team, setTeam] = useState("Выберите команду")
    const [failed, setFailed] = useState(false)
    const [comment, setComment] = useState("")
    const [teamRole, setTeamRole] = useState("")
    const dispatch = useDispatch()

    const params = useParams()
    useEffect(() => {
        dispatch(command("GET", "teams", []))
    }, [])

    var defuser = getOne(dispatch, "self", [], "", "undefined")

    var activeTeam = params.teamname
    if (activeTeam == undefined) {
        activeTeam = defuser.teamname
    }

    var teamUsers = useSelector(selectCommand("teams"))
    var teamUsers = teamUsers.filter((team) => team.teamname != 'Оценщики')
    var teamList = teamUsers.map((team, i) => {
        return (<option key={i}>{team.teamname}</option>)
    })
    teamList = [<option key={999}>Выберите команду</option>].concat(teamList)

    function checkName(name) {
        var err = ""
        if (name.length < 3) {
            err = "Имя должно быть не меньше 3 символов";
        }
        if (name == "") {
            err = "Поле обязательно для заполнения"
        }
        setName([name, err])
    }

    function checkTeamRole(role) {
        var err = ""
        if (role.length < 3) {
            err = "Роль должна быть не меньше 3 символов";
        }
        if (role == "") {
            err = "Поле обязательно для заполнения"
        }
        setTeamRole([role, err])
    }

    function checkUsername(username) {
        var err = ""
        if (username.length < 3) {
            err = "Имя пользователя должно быть не меньше 3 символов";
        } else if (username.length > 16) {
            err = "Имя пользователя должно быть не больше 16 символов";
        }
        if (username == "") {
            err = "Поле обязательно для заполнения"
        }
        if (!/^[\u0000-\u007f]*$/.test(username)) {
            err = "Пиши только буржуйскими буквами";
        }
        setUsername([username, err])
    }

    function checkEmail(email) {
        var err = ""
        console.log(email)
        if (!email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            err = "Неверный формат электронной почты";
        }
        if (email == "") {
            err = "Поле обязательно для заполнения"
        }
        setEmail([email, err])
    }

    function checkPassword(pass) {
        var err = ""
        if (pass.length < 8) {
            err = "Пароль должен быть не меньше 8 символов";
        }
        if (!/[a-z]/.test(pass)) {
            err = "Пароль должен содержать как минимум одну строчную букву";
        }
        if (!/[A-Z]/.test(pass)) {
            err = "Пароль должен содержать как минимум одну заглавную букву";
        }
        if (!/[0-9]/.test(pass)) {
            err = "Пароль должен содержать как минимум одну цифру";
        }
        if (pass == "") {
            err = "Поле обязательно для заполнения"
        }
        setPassword([pass, err])
    }

    function checkPasswordRepeat(newPass) {
        var err = ""
        if (newPass != password[0]) {
            err = "Пароли не совпадают"
        } else if (password[1] != "") {
            err = password[1]
        }
        if (newPass == "") {
            err = "Поле обязательно для заполнения"
        }
        setNewPassword([newPass, err])
    }

    function registrationHandler() {
        if (username[1] == "" && name[1] == "" && email[1] == "" && password[1] == "" && newPassword[1] == "" && teamRole[1] == "" &&
            username[0] != "" && name[0] != "" && name[0] != "" && password[0] != "" && newPassword[0] != "" && teamRole[0] != "") {
            var paccess = ""
            if (access == "Работяга") {
                paccess = "user"
            } else if (access == "Тимлид") {
                paccess = "teamlead"
            } else {
                return
            }

            if (team == "Выберите команду") {
                return
            }

            dispatch(command("POST", "register", [username[0], password[0], name[0], email[0], paccess, team, comment, teamRole[0]]))
            setTimeout(function () {
                dispatch(authorize(username[0], password[0]))
                setFailed(true)
            }, 300);

        }
    }

    var failedMsg = <div />
    if (failed) {
        failedMsg = <div className="text-main" style={{ color: "red" }}>Не удалось зарегистрироваться</div>
    }

    return (
        <LoginTemplate size="6">
            <p className="text-title mt-3 mb-1">Создать ваш аккаунт</p>
            <Link to="/signin">
                <p className="text-normal mr-1">Или <i className="link-normal">войти в существующий аккаунт.</i></p>
            </Link>

            {failedMsg}

            <div className="d-flex flex-row">
                <div className="col-6">
                    <InputField className="mx-4 pt-2"
                        placeholder="Как вас зовут?"
                        name="name"
                        type="text"
                        autoComplete="name"
                        onBlur={checkName}
                        feedback={name[1]}
                        error={name[1] != ""}
                    />

                    <InputField className="mx-4 pt-2 mb-3"
                        placeholder="Рабочая почта"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onBlur={checkEmail}
                        feedback={email[1]}
                        error={email[1] != ""}
                    />

                    <InputField className="mx-4 pt-2"
                        placeholder="Имя пользователя"
                        name="username"
                        type="text"
                        autoComplete="username"
                        onBlur={checkUsername}
                        feedback={username[1]}
                        error={username[1] != ""}
                    />

                    <InputField className="mx-4 pt-2"
                        placeholder="Пароль"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        onBlur={checkPassword}
                        feedback={password[1]}
                        error={password[1] != ""}
                    />

                    <InputField className="mx-4 mb-3 pt-2"
                        placeholder="Повторите пароль"
                        name="repeatpassword"
                        type="password"
                        autoComplete="new-password"
                        onBlur={checkPasswordRepeat}
                        feedback={newPassword[1]}
                        error={newPassword[1] != ""}
                    />
                </div>

                <div className="col-6">
                    <InputField className="mx-4 pt-2"
                        placeholder="Роль в команде"
                        onBlur={checkTeamRole}
                        feedback={teamRole[1]}
                        error={teamRole[1] != ""}
                    />

                    <div className="ml-4 pt-2 mr-4">
                        <Input
                            name="select"
                            type="select"
                            onInput={(e) => setAccess(e.target.value)}
                        >
                            <option>
                                Выберите должность
                            </option>
                            <option>
                                Тимлид
                            </option>
                        </Input>
                    </div>

                    <div className="ml-4 mb-3 mr-4 pt-2">
                        <Input
                            name="select"
                            type="select"
                            onInput={(e) => setTeam(e.target.value)}
                        >
                            {teamList}
                        </Input>
                    </div>

                    <div className="comment-about ml-4 mb-3 mr-4 mt-4">
                        <TextareaAutosize minRows={3} placeholder="О себе" className="comment p-0 m-0 col-12 p-1" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-row mx-4">
                <FormGroup check className="mr-auto">
                    <Input id="checkbox2" type="checkbox" />
                    <Label check className="text-normal">Запомнить меня</Label>
                </FormGroup>
            </div>

            <div onClick={registrationHandler} className="login-button mx-4 mb-4 d-flex flex-row pt-2 m-0" style={{ height: "40px" }}>
                <img src="/assets/logo/lock.png" className="ml-1" width={30} height={25} />
                <div className="col-10" style={{ position: "absolute" }}>
                    <p className="text-normal-light ml-5 mb-0 mt-1">Зарегистрироваться</p>
                </div>
            </div>
        </LoginTemplate>)
}


