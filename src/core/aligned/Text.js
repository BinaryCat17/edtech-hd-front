import React from "react"

export default function AlButton({ children, type, outline = true }) {
    return (
        <div className={"m-0 h" + size + " " + className}>
            {children}
        </div>
    );
}