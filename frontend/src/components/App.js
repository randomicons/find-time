import React from 'react'
import './App.Module.scss'
import {BrowserRouter as Router, Route} from "react-router-dom"
import Login from "./Login"
import ScheduleConsole from "./ScheduleConsole/ScheduleConsole"

function App() {
  return (
    <Router>
      <main>
        <Route exact path="/" component={Login}/>
        <Route exact path="/tasks/" component={ScheduleConsole}/>
      </main>
    </Router>
  )
}

export default App
