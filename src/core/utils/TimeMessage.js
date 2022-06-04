import React, { useState, useEffect } from "react"

export const TimeMessage = (props) => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (props.enabled) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
                props.onExpired()
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [props.enabled])

    if (!visible || !props.enabled) return <div />

    return (
        <div>
            {props.children}
        </div>
    )
}

