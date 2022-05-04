import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "modules/home/Page"
import NotFoundPage from "modules/notFound/Page"
import ContactPage from "modules/contact/Page"
import ProfilePage from "modules/staff/ProfilePage"
import StaffListPage from "modules/staff/ListPage"
import LoginPage from "modules/login/Page"

export default function AppRouter() {
    return (<Routes>
        <Route exact path="" element={<Navigate to="/home" />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/staff" element={<StaffListPage />} />
        <Route exact path="/staff/:personId" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage/>}/>
    </Routes>);
}