import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"

const io = require('socket.io-client')

import mainReducer from "./redux/reducers"

import Body from "./components/Body/Body.jsx"
import Content from './components/Content/Content.jsx'
import NavBar from './components/Navbar/Navbar.jsx'


const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

if (window.location.protocol != "https:") {
    window.location.protocol = "https:";
}


let socket = io()


ReactDOM.render(
    <Provider store={store}>
        <Body>

        </Body>
    </Provider>,
    document.getElementById("root")
)