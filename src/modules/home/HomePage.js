import React from "react";
import Header from "./Header"

export default function HomePage() {
    return (
        <div style={{ width: "100vw" }}>
            <Header />
            <div className="d-flex justify-content-center" style={{marginTop:"100px"}}>
                <div className="col-8">
                    <div className="col-12">
                        <div className="background-title col-12 " style={{ position: "absolute", left: 0 }}></div>
                        <div className="col-12 d-flex justify-content-center">
                            <div className="background-title-cover col-8"></div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="text-3 text-home2"></p>
                    </div>

                    <div className="d-flex flex-row">
                        <div className="">
                            <p className="text-4 text-home1">Удобное отслеживание компетенций участников команды </p>
                            <p className="text-5 text-home2">Система оценки гибких навыков сотрудников, которая позволяет отслеживать их развитие, сильные и слабые стороны, и на основе этого определить траекторию развития для каждого из членов команды</p>
                        </div>
                        <img src="/assets/images/stock1.jpg" className="col-6" />
                    </div>

                    <div className="d-flex flex-row mt-4">
                        <img src="/assets/images/stock2.jpg" className="col-6" />
                        <div className="">
                            <p className="text-8 text-home1">Встроенный KANBAN</p>
                            <p className="text-9 text-home2">Специальные инструменты, которые присутствуют в системе, позволяют тимлиду не рассредотачиваться между ресурсами по ведению команды и связываются с основным функционалом системы для увеличения эффективности работы тимлида</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row mt-4">
                        <div className="">
                            <p className="text-4 text-home1">Отслеживание эффективности команды</p>
                            <p className="text-5 text-home2">Система оповещает тимлида о всех дедлайнах на задачи, а также об изменении показателей сотрудников по их выполнению. Обратная связь помогает определить вовлеченность сотрудников в работу и то, насколько эффективно они взаимодействуют с коллегами</p>
                        </div>
                        <img src="/assets/images/stock3.jpg" className="col-6" />
                    </div>
                </div>
            </div>
        </div>
    )
}
