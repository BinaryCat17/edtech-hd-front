import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "modules/home/HomePage"
import NotFoundPage from "modules/notFound/Page"
import SignInPage from "modules/login/SignInPage"
import SignUpPage from "modules/login/SignUpPage"
import TeamEditPage from '../modules/teamEdit/TeamEditPage'
import TeamViewPage from '../modules/teamView/TeamUserPage'
import TeamReviewPage from '../modules/teamReview/TeamReviewPage'
import KanbanPage from '../modules/kanban/KanbanPage'

export default function AppRouter() {
    return (<Routes>
        <Route exact path="" element={<Navigate to="/home" />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/signin" element={<SignInPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/app/kanban" element={<KanbanPage />} />
        <Route exact path="/app/kanban/:teamname" element={<KanbanPage />} />
        <Route exact path="/app/kanban/:teamname/:username" element={<KanbanPage />} />
        <Route exact path="/app/team-edit" element={<TeamEditPage />} />
        <Route exact path="/app/team-edit/:teamname" element={<TeamEditPage />} />
        <Route exact path="/app/team-edit/:teamname/:username" element={<TeamEditPage />} />
        <Route exact path="/app/team-review" element={<TeamReviewPage />} />
        <Route exact path="/app/team-review/:teamname" element={<TeamReviewPage />} />
        <Route exact path="/app/team-review/:teamname/:username" element={<TeamReviewPage />} />
        <Route exact path="/app/team-review/:teamname/:username/:team/:viewuser" element={<TeamReviewPage />} />
        <Route exact path="/app/team-view" element={<TeamViewPage />} />
        <Route exact path="/app/team-view/:teamname/" element={<TeamViewPage />} />
        <Route exact path="/app/team-view/:teamname/:username" element={<TeamViewPage />} />
        <Route exact path="/app/team-view/:teamname/:username/:competention" element={<TeamViewPage />} />
        <Route exact path="/app/team-view/:teamname/:username/:competention/:level" element={<TeamViewPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>);
}