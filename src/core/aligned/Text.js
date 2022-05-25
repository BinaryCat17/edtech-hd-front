import React from "react"

export default function AlText({ children, size, className }) {
    return (
        <div className={"m-0 h" + size + " " + className}>
            {children}
        </div>
    );
}