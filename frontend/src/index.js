import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.scss'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {Provider} from "react-redux"
import store from "./store/index"

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  // The target element might be either root or app,
  // depending on your development environment
  // document.getElementById("app")
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
