import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route} from "react-router-dom"
import ListTasks from "./ListTasks"
import Schedule from "./Schedule"
import Login from "./Login"

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login}/>
        <ListTasks/>
        <Schedule/>
      </div>
    </Router>
  )
}

export default App
