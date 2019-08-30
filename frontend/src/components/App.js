import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from "./Login"
import ScheduleConsole from "./ScheduleConsole/ScheduleConsole"

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login}/>
        <Route exact path="/tasks/" component={ScheduleConsole}/>
      </div>
    </Router>
  )
}

export default App
