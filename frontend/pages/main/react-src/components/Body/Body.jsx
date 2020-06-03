import React from 'react'
import './Body.scss'

function Body(props) {
    return (
        <div id="body" style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            background: "#1a1a1a",
            overflowY: "auto",
            overflowX: "hidden"
        }}>
            {props.children}
        </div>
    )
}

export default Body
