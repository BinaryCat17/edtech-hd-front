import React from "react"
import Header from "./Header"
import Footer from "./Footer"

export default function Template({children}) {
    return (
        <div className="p-0 d-flex flex-column min-vh-100 main-background">
            <Header />
            <div style={{ minHeight: 60 }}></div>
            <div className="mt-4 mb-auto">
                {children}
            </div>
            <div className="p-0 mt-3">
                <Footer />
            </div>
        </div>
    );
}